const baseUrl = 'www.forverkliga.se/JavaScript/api/crud.php?';
const keyRequestUrl = "www.forverkliga.se/JavaScript/api/crud.php?requestKey";  // once you have a key, it is ok to store it in a variable
const urlKey = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + currentKey;
const title = ' ';
const newTitle = ' ';
const author = ' ';
const newAuthor = ' ';
const id = ' ';
const keyRequest = baseUrl
var createOperation = urlKey + `&op=insert&title=${title}&author=${author}`; 
//"status": "success", "id" : id generated
var readOperation = urlKey + '&op=select';
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
var updateOperation = urlKey + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
var deleteOperation = urlKey + `op=delete&id=${id}`;
var currentKey = localStorage.getItem('apiAccessKey');


// check if json.status is error/success

const bookElements = document.getElementsByClassName('book-element');
const bookArray = [];
bookArray = fetch(readRequest).then();
bookArray.forEach((book)=>{
    bookElements.push
});

function addBook(){
    let elem = document.getElementById('btn_add_book');
    // btnTimeout(elem)
}

function addBook(title, author) {
    
        fetch(insertBook + '&title=' + title + '&author=' + author)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status != "success" && currentRequests < maxRequests) {
                    currentRequests++;
                    addBook(title, author);
                } else {
                    ResetForms();      
                }
            });
}

function showBooks() {

}
bookArray.push(document.readRequest);

function requestKey(){
    
    let elem = document.getElementById('current_key');
    elem.innerHTML = 'Generating key...'
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
        .then(response => response.json())
        .then((data) => {
            if (currentKey == null) {
                requestKey();
            } else {
                console.log(data.key);
                localStorage.setItem('apiAccessKey', myJson.key);
                console.log(localStorage.getItem('apiAccessKey'));
                elem.innerHTML = data.key;
            }
    });
    
}

function btnTimeout(button){
    button.disabled = true;
    setTimeout(function(){button.disabled = false;}, 1000);
}
