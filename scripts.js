const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';
var accessUrl;
var keyRequestUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";  // once you have a key, it is ok to store it in a variable
var createOpUrl;
var readOpUrl;
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
// var updateOperation = urlKey + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
// var deleteOperation = urlKey + `op=delete&id=${id}`;
var currentKey;
var requestsCurrent = 0;
var requestLimit = 10;

function AddBook() {
        fetch(createOpUrl + `&title=${document.getElementById('title-submit').value}&author=${document.getElementById('author-submit').value}`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.status != "success" && requestsCurrent <= requestLimit) {
                    requestsCurrent++;
                    AddBook();
                } else {  
                    Refresh();
                }
            });
    
}

function BooksEmpty() {
    let currentBooks = document.getElementsByClassName('book-list-item');
    while (currentBooks.length > 0) {
        currentBooks[0].parentNode.removeChild(currentBooks[0]);
    }
}

function BooksFill(){
    fetch(readOpUrl)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson['data'] == undefined && requestsCurrent <= requestLimit) {
                requestsCurrent++;
                BooksFill();
            } else {
                const bookElementHtml = myJson['data'].map(book => {
                    console.log(typeof book.id.toString());
                    return `<div class="book-list-item w3-half">
                            <p>Author: ${book.author} , Title: ${book.title} </p>
                            <button onclick="DeleteBook(${book.id})">Delete</button>
                            <button onclick="EditBook(${book.id}, '${book.title}', '${book.author}')">Edit</button>
                            </div>` }).join('');
                document.querySelector('#book-list').insertAdjacentHTML('afterbegin', bookElementHtml);
                console.log(myJson['data']);    
            }
        });
}

function RequestKey(){
    fetch(keyRequestUrl)
        .then(response => response.json())
        .then((myJson) => {
            console.log(myJson.key);
            localStorage.removeItem('apiAccessKey');
            localStorage.setItem('apiAccessKey', myJson.key);
           
            Refresh()
        });
}

function Refresh(){
    if(requestsCurrent > requestLimit){
        alert('Error: too many failed requests. Try again later')
    }
    ValidateAccessUrl();
    BooksEmpty();
    BooksFill();
    requestsCurrent = 0;
    document.getElementById('author-submit').value = ""
    document.getElementById('title-submit').value = "";
    document.getElementById("store-header").innerText = `Generic book store #${currentKey}`;
}

function ValidateAccessUrl(){
    currentKey = localStorage.getItem('apiAccessKey');
    if(currentKey == null || currentKey == undefined){
        RequestKey();
        currentKey = localStorage.getItem('apiAccessKey');
        
    }
    accessUrl = baseUrl + currentKey;
    createOpUrl = accessUrl + '&op=insert';
    readOpUrl = accessUrl + '&op=select'; 

}

function BtnTimeout(button){
    button.disabled = true;
    setTimeout(function(){button.disabled = false;}, 1500);
}
