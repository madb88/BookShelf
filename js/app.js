$(function(){
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
           buttonParent.append(newDiv);
           button.removeClass("showbtn");
           button.text("Hide");
           //button.addClass("hideBtn"); //ZWIN INFORMACJE DOPISAC FUNKCJONALNOSC 
       }).fail(function(xhr, status, error){
           console.log("Ajax failed when reading book with id" + bookId);
       });
    });
    
    loadAllBooks();

});