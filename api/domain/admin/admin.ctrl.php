<?php

require_once(PATH_SYSTEM . 'db.php');

class Admin {

  private function res($data) {
    die(json_encode($data));
  }

  public function logar() {
    $this->post->password = md5($this->post->password);

    $db = new DB();

    $sql = "SELECT * FROM user WHERE
      username = '{$this->post->username}'
      AND password = '{$this->post->password}'";

    $query = $db->query($sql)->fetch(PDO::FETCH_OBJ);

    unset($query->password);

    $this->res($query);
  }

  public function saveUser() {
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

    unset($this->post->id, $this->post->repeatPassword, $res->password, $res->repeatPassword);

    $set = [];

    foreach ($this->post as $column => $value) {
      $set[] = " {$column} = '{$value}'";
    }

    $sql = 'UPDATE user SET ';
    if (count($set)) {
      $sql .= implode(', ', $set) . $where;
    }

    $db = new DB();

    if ($db->update($sql)) {
      $this->res($res);
    }
  }

  public function pending() {
    $db = new DB();

    $sql = "SELECT cus.*, rec.fileExtension, rec.whats
      FROM customer cus
        INNER JOIN receipt rec ON rec.id = cus.id
      WHERE cus.active    = 1
        AND cus.confirmed = 0
      ORDER BY cus.name";

    $res = $db->query($sql)->fetchAll(PDO::FETCH_OBJ);

    $this->res($res);
  }

  public function pendingRecharge() {
    $db = new DB();

    $sql = "SELECT cus.*
      FROM customer cus
      WHERE cus.active       = 1
        AND cus.confirmed    = 1
        AND cus.madeRecharge = 0
      ORDER BY cus.name";

    $res = $db->query($sql)->fetchAll(PDO::FETCH_OBJ);

    for ($i = count($res) - 1; $i > -1; $i--) {
      $customer = &$res[$i];

      $customer->topAffiliates = [];

      $maxNivel = 6;

      $usersService = new UsersService();

      $idTopAffiliate = $customer->affiliate;

      while (!empty($idTopAffiliate) && $maxNivel++) {
        $topAffiliate = $usersService->getTopAffiliate($idTopAffiliate);

        $customer->topAffiliates[] = $topAffiliate;

        $idTopAffiliate = $topAffiliate->affiliate;
      }
    }

    $this->res($res);
  }

  public function viewReceipt() {

    if (!empty($this->params[0])) {
      $id = preg_replace('/\..+$/', '', $this->params[0]);

      $db = new DB();
      $sql = "SELECT id, fileExtension, body from receipt
      WHERE id = '{$id}'";

      $res = $db->query($sql)->fetch(PDO::FETCH_OBJ);

      switch ($res->fileExtension) {
        case 'jpg':
        case 'jpeg':
          $mime = 'image/jpeg';
          break;
        case 'png':
          $mime = 'image/png';
        case 'pdf':
          $mime = 'application/pdf';
        default:
          $mime = '';
          break;
      }

      $res->mime = $mime;

      header('Content-type: ' . $mime);

      die($res->body);

    }
  }

  public function confirmPay() {

    if (isset($this->post->id) && !empty($this->post->id)) {
      $id  = $this->post->id;

      $sql = "UPDATE customer SET confirmed = 1 WHERE id = '{$id}'";

      $db = new DB();
      $db->update($sql);
    }

    $this->pending();
  }

  public function confirmRecharge() {

        if (isset($this->post->id) && !empty($this->post->id)) {
          $id  = $this->post->id;

          $sql = "UPDATE customer SET madeRecharge = 1 WHERE id = '{$id}'";

          $db = new DB();
          $db->update($sql);
        }

        $this->pendingRecharge();
  }
}
