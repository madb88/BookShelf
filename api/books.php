<?php
require_once ('./src/connection.php');
require_once ('./src/book.php');

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
    
} else if ($_SERVER['REQUEST_METHOD'] === "POST"){
    $bookToCreate = new Book();
    $bookToCreate->setTitle($_POST['title']);
    $bookToCreate->setAuthor($_POST['author']);
    $bookToCreate->setDescription($_POST['description']);
    $bookToCreate->saveBookToDb($conn);
    $bookToCreateJSON = json_encode($bookToCreate);
    echo ($bookToCreateJSON);
    
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    
    echo("DELETE<br>");
    parse_str(file_get_contents("php://input"), $del_vars);
    var_dump($del_vars);
//    $booktoDelete = new Book();
//    $booktoDelete->loadBookFromDb($del_vars['id'], $conn);
//    echo $booktoDelete;
//    $result = $booktoDelete->deleteFromDb($conn, $del_vars['id']);
//    echo json_encode($result);


}