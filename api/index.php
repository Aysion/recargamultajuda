<?php
ini_set('display_errors', '1');

header('Content-Type: application/json');

date_default_timezone_set('Brazil/East');
define('PATH_API', __DIR__);
define('PATH_SYSTEM', PATH_API . '/system/');
define('PATH_DOMAIN', PATH_API . '/domain/');
define('PATH_SERVICE', PATH_API . '/services/');

require_once (PATH_SYSTEM . 'system.php');
// require_once ($local . 'controller.php');
// require_once ($local . 'model.php');

spl_autoload_register(['System', 'autoload']);

try {
  $system = new System();

} catch (Exception $e) {
  echo json_encode([
    'err'       => 'Error system',
    'exception' => [
      'message'       => $e->getMessage(),
      'code'          => $e->getCode(),
      'file'          => $e->getFile(),
      'line'          => $e->getLine(),
      'trace'         => $e->getTrace(),
      'traceAsString' => $e->getTraceAsString(),
      'previous'      => $e->getPrevious(),
    ]
  ]);
}
//
// $system->construct($requestUri);
//
//
//
// $system->run();
