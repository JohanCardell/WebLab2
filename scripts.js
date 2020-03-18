const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';
var keyUrl;
const keyRequestUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";  // once you have a key, it is ok to store it in a variable
var title = ' ';
var newTitle = ' ';
const author = ' ';
const newAuthor = ' ';
const id = ' ';
const keyRequest = baseUrl
var createOperation;
//"status": "success", "id" : id generated
var readOperation =  baseUrl + '&op=select';
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
// var updateOperation = urlKey + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
// var deleteOperation = urlKey + `op=delete&id=${id}`;
var currentKey = localStorage.getItem('apiAccessKey');

var currentRequests = 0;
var maxRequests = 10;


// check if json.status is error/success

// const bookElements = document.getElementsByClassName('book-element');
// const bookArray = [];
// bookArray = fetch(readRequest).then();
// bookArray.forEach((book)=>{
//     bookElements.push
// });
// bookArray.push(document.readRequest);

function AddBook() {
    createOperation = keyUrl + `&op=insert&title=${document.getElementById('title-submit').value}&author=${document.getElementById('author-submit').value}`; 
        fetch(createOperation)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.status != "success" && currentRequests < maxRequests) {
                    currentRequests++;
                    console.log(createOperation);
                    AddBook();
                } else{
                    if(myJson.status != "success" && currentRequests >= maxRequests){
                        alert(myJson.message);
                    }
                    RestoreValues();
                    console.log(createOperation);
                }
            });
    
}

function GetBooks() {
    var elements = document.getElementsByClassName("book-element");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    fetch(getBooks)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson['data'] == undefined && currentRequests <= maxRequests) {
                currentRequests++;
                GetBooks();
            } else {

                const html = myJson['data'].map(book => { console.log(typeof book.id.toString()); return `<div class="bookListItem"><p>Author: ${book.author} , Title: ${book.title} </p><button onclick="DeleteBook(${book.id})">Delete</button><button onclick="UpdateBook(${book.id}, '${book.title}', '${book.author}')">UpdateBook</button></div>` }).join('');
                document.querySelector('#book-element').insertAdjacentHTML('afterbegin', html);
            }
            console.log(myJson['data']);    
        });
}

function ValidateUrl(){
    if(currentKey == null || currentKey == undefined){
        RequestKey();
    }
    AmendUrls();
}

function RequestKey(){
    
    let elem = document.getElementById('current-key');
    elem.innerHTML = 'Generating key...'
    fetch(keyRequestUrl)
        .then(response => response.json())
        .then((myJson) => {
            console.log(myJson.key);
            localStorage.removeItem('apiAccessKey');
            localStorage.setItem('apiAccessKey', myJson.key);
            elem.innerHTML = myJson.key;
            console.log(localStorage.getItem('apiAccessKey'));
            AmendUrls()
        });
}

function RestoreValues(){
    if (currentRequests > maxRequests) {
        alert("Hit max amount of errors from server, please try again)");
    }
    currentRequests = 0;

    document.getElementById('author-submit').value = ""
    document.getElementById('title-submit').value = "";
}

function AmendUrls(){
    keyUrl = baseUrl + currentKey;
    // createOpUrl = keyUrl + `&op=insert&title=${document.getElementById('title-submit').value}&author=${document.getElementById('author-submit').value}`;

}

function BtnTimeout(button){
    button.disabled = true;
    setTimeout(function(){button.disabled = false;}, 1500);
}
