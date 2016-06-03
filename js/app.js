$(function(){
    
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
        $.ajax({
            url: "http://192.168.33.22/RestBookShelf/api/books.php",
            method: "GET",
            dataType: "JSON"
        }).done(function(bookNamesArray){
            bookList.empty();
            for(var i = 0; i < bookNamesArray.length; i++){
                var newLi = $("<li>");
                var removeButton = $('<button class="delbtn">Delete</button>');
                var showButton = $('<button class="showbtn">Show more info</button>');
                newLi.attr("data-id", bookNamesArray[i].id);
                newLi.text(bookNamesArray[i].name);
                newLi.append(showButton);
                newLi.append(removeButton);
                bookList.append(newLi);
            }
        }).fail(function(xhr, status, error){
            console.log("Load all books ajax failed");
        });
        
    };
    
    
    var bookList = $("#listWithBooks");
    bookList.on("click",".showbtn", function(){
       var button = $(this);
       var bookId = button.parent().data("id");
       var buttonParent = $(this).parent();
       $.ajax({
           url: "http://192.168.33.22/RestBookShelf/api/books.php",
           method: "GET",
           data: {id: bookId},
           dataType: "JSON"
       }).done(function(book){
           var newDiv = $("<div><h1>" + book.title + "</h1>"+ "<p>"+ book.author + "</p>" + "<p>" + book.description + "</p>" +"</div>");
           newDiv.addClass("info");
           buttonParent.append(newDiv);
           button.removeClass("showbtn");
           button.text("Hide");
           button.addClass("hideBtn");
           
       }).fail(function(xhr, status, error){
           console.log("Ajax failed when reading book with id" + bookId);
       });
    });
    
    bookList.on("click", ".hideBtn", function(){
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
        console.log(bookId);
        $.ajax({
            url: "http://192.168.33.22/RestBookShelf/api/books.php",
            type: "DELETE",
            data: info,
//            dataType: "json"
        }).done(function(){
            console.log('dziala');;
        }).fail(function(xhr, status, error){
            console.log('Error - ajax DELETE');
        });
       
    });
    
    
    loadAllBooks();

});