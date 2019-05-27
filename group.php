<?php
require_once "connect.php";
function get_group($connect) {
    $sql = "SELECT * FROM it";

    $result = mysqli_query($connect, $sql);

    $info = mysqli_fetch_all($result, 1);
    
    return $info; //php массив со студентами и оценками
}

$marks = get_group($connect);

$name = $web = $bd = $logic = $english = "";
foreach ($marks as $value) {
    $name = $name . $value["name"] . ",";
    $web  =  $web . $value["web"] . ",";
    $bd  = $bd . $value["bd"] . ",";
    $logic  = $logic . $value["logic"] . ",";
    $english  = $english . $value["english"] . ",";
 }


?>
{"name":"<?=$name?>"
,"web":"<?=$web?>"
,"bd":"<?=$bd?>"
,"logic":"<?=$logic?>"
,"english":"<?=$english?>"
}