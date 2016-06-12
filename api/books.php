<?php

header("Access-Control-Allow-Origin: *");
require_once ('./src/connection.php');
require_once ('./src/book.php');


if ($_SERVER['REQUEST_METHOD'] === "GET") {
    if (isset($_GET['id'])) {
        $bookToShow = new Book();
        $bookToShow->loadBookFromDb($_GET['id'], $conn);
        $bookToShowJSON = json_encode($bookToShow->toArray());
        echo($bookToShowJSON);
    } else {
        $allBooksName = Book::getBooksNames($conn);
        $allBooksNameJSON = json_encode($allBooksName);
        echo $allBooksNameJSON;
    }
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $bookToCreate = new Book();
    $bookToCreate->setTitle($_POST['title']);
    $bookToCreate->setAuthor($_POST['author']);
    $bookToCreate->setDescription($_POST['description']);
    $bookToCreate->saveBookToDb($conn);
    $bookToCreateJSON = json_encode($bookToCreate);
    echo ($bookToCreateJSON);
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    parse_str(file_get_contents("php://input"), $del_vars);

    $bookToDelete = new Book();
    $bookToDelete->loadBookFromDb($conn, $del_vars['id']);
    $bookToDelete->deleteFromDb($conn, $del_vars['id']);
    echo json_encode($bookToDelete);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    parse_str(file_get_contents("php://input"), $put_vars);
    $bookToEdit = new Book();
    $bookToEdit->update($conn, $put_vars['id'], $put_vars['title'], $put_vars['author'], $put_vars['description']);
    echo json_encode($bookToEdit);
}
