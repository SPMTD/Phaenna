<?php
//SCHOOL HOST
//$host = "sql.cmi.hro.nl";
//$username = "0876190";
//$password = "xohchahp";
//$database = "0876190";

//LOCALHOST
$host = "localhost";
$username = "root";
$password = "";
$database = "Phaenna";

$db = mysqli_connect($host, $username, $password, $database) or die('Error: '.mysqli_connect_error());
?>
