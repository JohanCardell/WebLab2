let key = 'API-key';
www.forverkliga.se/JavaScript/api/crud.php?requestKey;  // once you have a key, it is ok to store it in a variable
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
const title = ' ';
const newTitle = ' ';
const author = ' ';
const newAuthor = ' ';
const id = ' ';
const create = baseUrl + `&op=insert&title=${title}&author=${author}`; 
//"status": "success", "id" : id generated
const readRequest = baseUrl + '&op=select';
//returns JSON object with status success, "data": [{"id", "title", "author", "updated"}]
const updateRequest = baseUrl + `op=update&id=${id}&title=${newTitle}&author=${newAuthor}`;
const deleteRequest = baseUrl + `op=delete&id=${id}`;

fetch(url).then(???)
// check if json.status is error/success

const bookElements = document.getElementsByClassName('book-element');
const bookArray = [];
bookArray = fetch(readRequest).then();
bookArray.forEach((book)=>{
    bookElements.push
});

function showBooks() {

}
var element = document.getElementsByClassName('');
bookArray.push(document.readRequest)
