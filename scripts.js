const baseUrl = 'www.forverkliga.se/JavaScript/api/crud.php?';
const keyRequestUrl = "www.forverkliga.se/JavaScript/api/crud.php?requestKey";  // once you have a key, it is ok to store it in a variable
const urlKey = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + currentKey;
const title = ' ';
const newTitle = ' ';
const author = ' ';
const newAuthor = ' ';
const id = ' ';
const keyRequest = baseUrl
const create = urlKey + `&op=insert&title=${title}&author=${author}`; 
//"status": "success", "id" : id generated
const readRequest = urlKey + '&op=select';
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
const updateRequest = urlKey + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
const deleteRequest = urlKey + `op=delete&id=${id}`;
var currentKey = localStorage.getItem('apiAccessKey');


//fetch(url).then(???)
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

function showBooks() {

}
var element = document.getElementsByClassName('');
bookArray.push(document.readRequest);

// function showCurrentKey(){
//     if(currentKey == null){
//         return 'No current key'
//     } else{
//         return currentKey;

//     }
    
// }
function requestKey(){
    
    let elem = document.getElementById('current_key');
    elem.innerHTML = 'Generating key...'
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
        .then(response => response.json())
        .then((myJson) => {
            if (currentKey == null) {
                requestKey();
            } else {
                console.log(myJson.key);
                localStorage.setItem('apiAccessKey', myJson.key);
                console.log(localStorage.getItem('apiAccessKey'));
                elem.innerHTML = myJson.key;
            }
    });
    
}

function btnTimeout(button){
    let buttons = document.getElementsByClassName("button");
    buttons.disabled = true;
    setTimeout(function(){buttons.disabled = false;}, 2000);
}
