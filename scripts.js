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
var readOperation;
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
// var updateOperation = urlKey + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
// var deleteOperation = urlKey + `op=delete&id=${id}`;
var currentKey = localStorage.getItem('apiAccessKey');

var requestsCurrent = 0;
var requestLimit = 10;


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
                if (myJson.status != "success" && requestsCurrent < requestLimit) {
                    requestsCurrent++;
                    console.log(createOperation);
                    AddBook();
                } else if(requestsCurrent >= requestLimit){
                    alert(myJson.message);
                } else{
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
    fetch(readOperation)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (requestsCurrent > requestLimit){
                alert
            }
            if (myJson['data'] == undefined && requestsCurrent < requestLimit) {
                requestsCurrent++;
                BooksFill(readOperation);
            } else {
                const bookElementHtml = myJson['data'].map(book => {
                    console.log(typeof book.id.toString());
                    return `<div class="book-list-item w3-half">
                            <p>Author: ${book.author} , Title: ${book.title} </p>
                            <button onclick="DeleteBook(${book.id})">Delete</button>
                            <button onclick="EditBook(${book.id}, '${book.title}', '${book.author}')">Edit</button>
                            </div>` }).join('');
                document.querySelector('#book-list').insertAdjacentHTML('afterbegin', bookElementHtml);
            }
            console.log(myJson['data']);    
        });
}

// function ValidateUrl(){
//     if(currentKey == null || currentKey == undefined){
//         RequestKey();
//     }
//     AmendUrls();
// }

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
            Refresh();
        });
}

function Refresh(){
    AmendUrls();
    RestoreValues();
    BooksEmpty();
    BooksFill();
}
function RestoreValues(){
    requestsCurrent = 0;
    document.getElementById('author-submit').value = ""
    document.getElementById('title-submit').value = "";
}

function AmendUrls(){
    keyUrl = baseUrl + currentKey;
    createOpUrl = keyUrl + `&op=insert&title=${document.getElementById('title-submit').value}&author=${document.getElementById('author-submit').value}`;
    readOperation = keyUrl + '&op=select'; 

}

function BtnTimeout(button){
    button.disabled = true;
    setTimeout(function(){button.disabled = false;}, 1500);
}
