<?php
require_once(PATH_SYSTEM . 'db.php');

class App {
  public function index() {
    // $db = new DB();

    // redistribui os afiliados
    // $sql = 'select * from customer where id <> \'587bc6a0ad4477\'';
    //
    // $query = $db->query($sql)->fetchAll(PDO::FETCH_OBJ);
    // $usersService = new UsersService();
    //
    // for ($i = 0, $ii = count($query); $i < $ii; $i++) {
    //   $affiliate = $usersService->validAffiliate((object) [
    //     'affiliate' => '587bc6a0ad4477'
    //   ]);
    //
    //   $customer = $query[$i];
    //   $query[$i]->affiliate = $affiliate;
    //
    //   $db->update("UPDATE customer SET affiliate = '{$affiliate}' WHERE id = '{$customer->id}'");
    // }
    //
    // print_r($query);
  }
}
