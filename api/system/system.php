<?php
class System {
  protected $requestUri;
  protected $domain;
  protected $method;
  protected $params;

  public static function autoload($className) {
    preg_match('/(.+)(Service)$/', $className, $match);

    $mappingPath = [
      'Service' => PATH_SERVICE
    ];

    if (isset($mappingPath[$match[2]])) {
      require_once($mappingPath[$match[2]] . lcfirst($match[1]) . '.' . strtolower($match[2]) . '.php');
    } else {
      print_r([
        'className' => $className,
        'match' => $match,
      ]);
      die;
    }
}

  public function __construct() {
    $this->run();
  }

  public function setRequestUri() {
    $requestUri = array_values(array_filter(explode('/', $_SERVER['REQUEST_URI']), function($param) {
      return !empty($param) && $param !== 'api';
    }));

    if (count($requestUri) === 0) {
      $requestUri[] = 'app';
      $requestUri[] = 'index';
    }

    $this->requestUri = $requestUri;

    return $this;
  }

  public function getRequestUri() {
    return $this;
  }

  public function setDomain() {
    $this->domain = $this->requestUri[0];

    return $this;
  }

  public function getDomain() {
    return $this->$domain;
  }

  public function setMethod() {
    $this->method = isset($this->requestUri[1]) ? $this->requestUri[1] : 'index';

    return $this;
  }

  public function getMethod() {
    return $this->$method;
  }

  public function setParams() {
    $params = $this->requestUri;

    unset($params[0], $params[1]);

    $this->params = array_values($params);

    return $this;
  }

  public function getParams() {
    return $this->params;
  }

  private function getPost() {
    $body = json_decode(file_get_contents('php://input'));

    if (empty($body)) {
      $body = (object) $_POST;
    }

    return $body;
  }

  private function getFile() {
    $files = new stdClass();

    if ($_FILES) {
      foreach ($_FILES as $key => $val) {
        $files->{$key} = (object) $val;
      }
    }

    if ($files === new stdClass()) {
      $files = null;
    }

    return $files;
  }

  public function run() {
    $this->setRequestUri()
    ->setDomain()
    ->setMethod()
    ->setParams()
    ->loadDomain();
  }

  public function loadDomain() {
    $domain = $this->domain . '/' . $this->domain . '.ctrl.php';

    $domainPath = PATH_DOMAIN . $domain;

    if (!file_exists($domainPath)) {
      throw new Exception('Not exists ctrl: ' . $domain, 1);
    }

    require_once($domainPath);

    $app = new $this->domain();

    if (!method_exists($app, $this->method)) {
      throw new Exception('Not exists method: ' . $this->method, 2);
    }

    $app->post = $this->getPost();
    $app->files = $this->getFile();
    $app->params = $this->getParams();
    $method = $this->method;

    $app->$method();
  }
}
