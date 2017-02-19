<?php

require_once(PATH_SYSTEM . 'db.php');

class Login {

  private function res($data) {
    echo json_encode($data);
  }

  public function logar() {
    $this->post->password = md5($this->post->password);

    $db = new DB();

    $sql = "SELECT * FROM customer WHERE
      active = 1
      AND email = '{$this->post->email}'
      AND password = '{$this->post->password}'";

    $query = $db->query($sql)->fetch(PDO::FETCH_OBJ);

    unset($query->password);

    $usersService = new UsersService();

    $receipt = $usersService->getReceipt($query->id);

    $query->hasReceipt = isset($receipt->id);

    $query->opts = (object) [
      'whats' => null
    ];

    if ($query->hasReceipt) {
      $query->opts->whats = $receipt->whats;
    }


    $this->res($query);
  }

  public function cadastro() {
    if (empty($this->post->email) || empty($this->post->name) || empty($this->post->password)) {
      $this->res([
        'err' => 'Campo invalido',
      ]);
    } else {

      if (!empty($this->post->affiliate)) {
        $usersService = new UsersService();

        $this->post->affiliate = $usersService->validAffiliate($this->post);
      }

      $this->post->password = md5($this->post->password);
      $this->post->id = uniqid() . mt_rand(0, 9);

      $sql = "INSERT INTO customer (id, affiliate, email, name, password, active) VALUES (
        '{$this->post->id}', '{$this->post->affiliate}', '{$this->post->email}', '{$this->post->name}', '{$this->post->password}', 1
      )";

      $db = new DB();

      $db->insert($sql);

      unset($this->post->password, $this->post->repeatPassword);
      $this->res($this->post);
    }
  }
}
