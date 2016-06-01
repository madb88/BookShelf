<?php
require_once ('./src/connection.php');
header("Access-Control-Allow-Origin: *");

if($_SERVER['REQUEST_METHOD'] === "GET"){
    if(isset($_GET['id'])){
        $bookToShow = new Book();
        $bookToShow->loadBookFromDb($_GET['id'], $conn);
        $bookToShowJSON=  json_encode($bookToShow->toArray());
        echo($bookToShowJSON);
    } 
    else {
    $allBooksName = Book::getBooksNames($conn);
    $allBooksNameJSON = json_encode($allBooksName);
    echo $allBooksNameJSON;
    }
}