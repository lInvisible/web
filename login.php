<?php
require_once "connect.php";
$login = $_POST['login'];
$password = $_POST['password'];
$result = "";
$users = get_info($connect);

foreach ($users as $value) {
   if ($value["login"] != $login && $value["password"] != $password){
    exit();
   }
}


?>
{"result":"<?=$login?>"}