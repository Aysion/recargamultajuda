<?php
class DB {
  protected $connection;
  public $lastInsertId;

  public function __construct() {
    $this->connection = new PDO('mysql:host=127.0.0.1;dbname=rma;charset=utf8', 'root', 'admin');
  }

  public function query($sql) {
    return $this->connection->query($sql);
  }

  public function insert($sql) {
    // die($sql);
    $query = $this->connection->prepare($sql);

    $query->execute();

    $this->lastInsertId = $this->connection->lastInsertId();

    return $this->lastInsertId;
  }

  public function update($sql) {
    $query = $this->connection->prepare($sql);
    return $query->execute();
  }
}
