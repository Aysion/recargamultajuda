<?php

require_once(PATH_SYSTEM . 'db.php');

class UsersService {

  public function validAffiliate($data) {
    $db = new DB();

    $sql = "SELECT * FROM customer WHERE ID = '{$data->affiliate}'";

    $dataAffiliate  = $db->query($sql)->fetch(PDO::FETCH_OBJ);
    $dataAffiliates = $this->getAffiliates($data->affiliate);

    if ($dataAffiliate->active && count($dataAffiliates) < 2) {
      return $data->affiliate;
    } else {
      return $this->getAffiliateLoose($dataAffiliates);
    }
  }

  public function getAffiliates($idAffiliate) {
    $db = new DB();

    $sql = "SELECT * FROM customer WHERE active = 1 AND affiliate = '{$idAffiliate}'";

    return $db->query($sql)->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTopAffiliate($id) {
    $db = new DB();

    $sql = "SELECT * FROM customer WHERE active = 1 AND id = '{$id}'";

    return $db->query($sql)->fetch(PDO::FETCH_OBJ);
  }

  public function getAffiliateLoose($dataAffiliates) {

    do {
      $affiliate     =
      $newAffiliates = [];
      $minQuantity = 2;

      for ($i = count($dataAffiliates) - 1; $i > -1; $i--) {
        $dataAffiliates[$i]->affiliates = $this->getAffiliates($dataAffiliates[$i]->id);

        $affiliates = $dataAffiliates[$i]->affiliates;
        $quantity = count($affiliates);

        if ($minQuantity > $quantity) {
          $minQuantity = $quantity;

          $affiliate = $dataAffiliates[$i];

          if ($quantity === 0) {
            break;
          }

        } else {
          $newAffiliates = array_merge($newAffiliates, $dataAffiliates[$i]->affiliates);
        }
      }

      $dataAffiliates = $newAffiliates;
    } while (count($affiliate) === 0);

    return $affiliate->id;
  }

  public function getReceipt($id) {
    $db = new DB();

    $sql = "SELECT * FROM receipt WHERE id = '{$id}'";

    return $db->query($sql)->fetch(PDO::FETCH_OBJ);
  }

}
