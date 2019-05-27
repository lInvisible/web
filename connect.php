<?php

$connect = mysqli_connect("localhost", "root", "", "users");


     if (mysqli_connect_errno()){
         echo "error";
         exit();
     }


     function get_info($connect) {
         $sql = "SELECT * FROM user";

         $result = mysqli_query($connect, $sql);

         $info = mysqli_fetch_all($result, 1);

         return $info; //php массив с пользователями
     }

?>