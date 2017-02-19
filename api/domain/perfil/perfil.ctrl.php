<?php

require_once(PATH_SYSTEM . 'db.php');

class Perfil {

  private function res($data) {
    echo json_encode($data);
  }

  public function salvar() {
    if (!isset($this->post->id) || empty($this->post->id)) {
      $this->res([
        'err' => 'Usuário invalido',
      ]);
    }

    $where = " WHERE id = '{$this->post->id}'";

    if (isset($this->post->password)) {
      if(empty($this->post->password) || $this->post->password !== $this->post->repeatPassword) {
        unset($this->post->password);
      } else {
        $this->post->password = md5($this->post->password);
      }
    }

    $res = clone $this->post;

    unset($this->post->id, $this->post->affiliate, $this->post->repeatPassword, $res->password, $res->repeatPassword);

    $set = [];

    foreach ($this->post as $column => $value) {
      $set[] = " {$column} = '{$value}'";
    }

    $sql = 'UPDATE customer SET ';
    if (count($set)) {
      $sql .= implode(', ', $set) . $where;
    }

    $db = new DB();

    if ($db->update($sql)) {
      $this->res($res);
    }
  }

  public function getAffiliates() {
    $db = new DB();

    $id = $this->post->id;

    $sql = "SELECT id AS 'key', name
    FROM customer
    WHERE active = 1
      AND ID = '{$id}'";

    // $dataAffiliates = new stdClass();

    $dataAffiliates = $db->query($sql)->fetchAll(PDO::FETCH_OBJ);

    $affiliates = $this->affiliates($id, 6);

    $this->res(array_merge($dataAffiliates, $affiliates));
  }

  private function affiliates($id, $maxNivel) {
    $db = new DB();

    if ($maxNivel === 0) {
      return [];
    }

    if ($maxNivel !== -1) {
      $maxNivel--;
    }

    $sql = "SELECT id AS 'key', name, affiliate AS parent
    FROM customer
    WHERE active = 1
      AND affiliate = '{$id}'";

    $dataAffiliates = $db->query($sql)->fetchAll(PDO::FETCH_OBJ);
    $affiliates = $dataAffiliates;
    for ($i = (count($dataAffiliates) - 1); $i > -1; $i--) {
      $affiliates = array_merge($affiliates, $this->affiliates($dataAffiliates[$i]->key, $maxNivel));
    }

    return $affiliates;
  }

  function upload() {

    if ($this->post->id) {
      $db = new DB();

      if (!empty($this->files->file->tmp_name)) {

        $fileExtension = preg_replace('/.+\.([\w\d]{2,4})$/', '$1', $this->files->file->name);

        $blob = addslashes(file_get_contents($this->files->file->tmp_name));

        $sql = "REPLACE INTO receipt (id, fileExtension, body) VALUES (
          '{$this->post->id}', '{$fileExtension}', '{$blob}'
        )";

        $db->insert($sql);
      }

      if ($this->post->opts['whats']) {
        $sql = "REPLACE INTO receipt (id, whats) VALUES (
          '{$this->post->id}', '{$this->post->opts['whats']}'
        )";

        $db->insert($sql);
      }

      $usersService = new UsersService();

      $receipt = $usersService->getReceipt($this->post->id);

      $this->res([
        'has' => isset($receipt->id),
        'opts' => [
          'whats' => $receipt->whats
        ]
      ]);

    }
  }
}

// $insertFormat = new stdClass();
//
// $insertFormat->column = [];
// $insertFormat->value = [];
//
// foreach ($this->post as $column => $value) {
//   $insertFormat->column[] = $column;
//   $insertFormat->value[]  = $value;
// }
