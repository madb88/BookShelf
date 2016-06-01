<?php
require_once __DIR__.'/book.php';

$DBusername = "root";
$DBpassword = "coderslab";
$DBadress = "localhost";
$DBname = "bookshelf";

$conn = new mysqli($DBadress, $DBusername, $DBpassword, $DBname);

if($conn->errno){
    die("Cant connect to database. Error:".$conn->error);
}

