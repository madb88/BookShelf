<?php
header("Access-Control-Allow-Origin: *");
require_once ('./src/connection.php');
require_once ('./src/book.php');


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
    
if ($_SERVER['REQUEST_METHOD'] === "POST"){
    $bookToCreate = new Book();
    $bookToCreate->setTitle($_POST['title']);
    $bookToCreate->setAuthor($_POST['author']);
    $bookToCreate->setDescription($_POST['description']);
    $bookToCreate->saveBookToDb($conn);
    $bookToCreateJSON = json_encode($bookToCreate);
    echo ($bookToCreateJSON);
    
}
if ($_SERVER['REQUEST_METHOD'] === '_DELETE'){
    var_dump($_SERVER);
    parse_str(file_get_contents("php://input"), $del_vars);
    var_dump($del_vars);
    var_dump($del_vars['id']);
//    $booktoDelete = new Book();
//    $booktoDelete->loadBookFromDb($del_vars['id'], $conn);
//    $booktoDelete->deleteFromDb($conn, $del_vars['id']);
//    echo json_encode($booktoDelete);


}