$(function(){
     
    //Adding new book -> FORM
    var form = $("#newBook");
    form.on("submit",function(event){
        event.preventDefault();
        var dataFromForm = form.serialize();
        $.ajax({
            url: "http://192.168.33.22/RestBookShelf/api/books.php",
            method: "POST",
            data: dataFromForm,
            dataType: "JSON"
        }).done(function(){
            loadAllBooks();
        }).fail(function(xhr, status, error){ 
            console.log("adding new book failed - ajax POST");
        });
    });
        
    var loadAllBooks = function(){
        var bookList = $("#listWithBooks");
        var tableWithList = $("#table");
        $.ajax({
            url: "http://192.168.33.22/RestBookShelf/api/books.php",
            method: "GET",
            dataType: "JSON"
        }).done(function(bookNamesArray){
            bookList.empty();
            for(var i = 0; i < bookNamesArray.length; i++){
                var newLi = $("<li style='font-size:15px'>");
                //***New table***********
                var newTable = $("<table>");
                var newTr = $("<tr>");
                var newTd = $("<td>");
                var newTd2 = $("<td>");
                var newTd3= $("<td>");
                //***********************
                var removeButton = $('<button class="delbtn btn btn-danger btn-xs" id="deleteButton">Delete</button>');
                var showButton = $('<button class="showbtn btn btn-primary btn-xs">Show more info</button>');
                newLi.attr("data-id", bookNamesArray[i].id);
                newLi.text("Book Title: "+bookNamesArray[i].name);
                
//                newTr.append(newLi);
//                newTable.append(newTr);
                if(bookNamesArray[i].id === "666"){
                    removeButton.css("display","none");
                }
                newTd.append(newLi);
                newLi.append(showButton);
                newLi.append(removeButton);
                newTr.append(newTd);
                newTr.append(newTd2);
                newTr.append(newTd3);
                bookList.append(newTr);
                tableWithList.append(bookList);
            }
        }).fail(function(xhr, status, error){
            console.log("Load all books ajax failed");
        });  
    };
    
    //Showing info about book
    var bookList = $("#listWithBooks");
    console.log(bookList);
    bookList.on("click",".showbtn", function(){
       var button = $(this);
       var bookId = button.parent().data("id");
       var deleteButton = $("#deleteButton");
       
       
       var buttonParent = $(this).parent();
       $.ajax({
           url: "http://192.168.33.22/RestBookShelf/api/books.php",
           method: "GET",
           data: {id: bookId},
           dataType: "JSON"
       }).done(function(book){
           var newDiv = $("<div><h1>Title: " + book.title + "</h1>"+ "<p>Author: "+ book.author + "</p>" + "<p>Description: " + book.description + "</p>" +"</div>");
           if(bookId === 666){
               newDiv = $("<div><strong>SECRET</strong></div>");
           }
           newDiv.addClass("info");
           buttonParent.append(newDiv);
           button.toggleClass("showbtn");
           button.text("Hide");
           button.addClass("hideBtn");
           
           //Form for updating 
           var formTitle = $("<p><strong>Update book</strong></p>");
           var newForm = $("<form id='editBook' action='#'>");
           var inputName = $("<label>Title </label><input id='name' name='title' class='form-control'>");
           var inputAuthorName = $("<label>Author </label><input id='author_name' name='author' class='form-control'>");
           var inputDescription = $("<label>Description </label><input id='description' name='description' class='form-control'>");
           var inputSubmit = $("<input type='submit' value='Update Book' id='update_book' class='btn btn-success'>");
           
           //Adding new form
           newForm.append(formTitle);
           newForm.append(inputName);
           newForm.append(inputAuthorName);
           newForm.append(inputDescription);
           newForm.append(inputSubmit);
           if(bookId === 666){
               newDiv = $("<div>");
               newDiv.remove(deleteButton);
           }
           newDiv.append(newForm);
           
           
       }).fail(function(xhr, status, error){
           console.log("Ajax failed when reading book with id" + bookId);
   });
        
        var divInfo = $(".info");
        var form2 = $("#editBook");
        bookList.one("submit","#editBook", function(event){
            event.preventDefault();   
            event.stopImmediatePropagation();
//            event.stopPropagation();
            var dataFromForm2 = $(this).serialize();
                        
            $.ajax({
                url: "http://192.168.33.22/RestBookShelf/api/books.php",
                method: "PUT",
                data: "id="+bookId + "&"+ dataFromForm2,
                dataType: "json"
            }).done(function(){
                loadAllBooks();
                
            }).fail(function(xhr, status, error){
                console.log('Error - ajax PUT'+error);
            });
        }); 
    });
    
    bookList.on("click", ".hideBtn", function(event){
        event.stopPropagation();
        var button = $(this);
        var buttonParent = $(this).parent();
        var newDiv = $(".info");
        newDiv.empty();
        button.text("Show more info");
        button.addClass("showbtn");
    });
        
    // Delete the book
    bookList.on("click", ".delbtn", function(){
        
        var button = $(this);
        var bookId = button.parent().data("id");
        var info = "id="+bookId;
        
        $.ajax({
            url: "http://192.168.33.22/RestBookShelf/api/books.php",
            type: "DELETE",
            data: info
        }).done(function(){
            loadAllBooks();
        }).fail(function(xhr, status, error){
            console.log('Error - ajax DELETE');
        });
       
    });
    
loadAllBooks();
});