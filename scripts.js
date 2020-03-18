var baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';
var accessUrl;
var currentKey;
var keyRequestUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
var createOpUrl;
var readOpUrl;
var updateOpUrl;
var deleteOpUrl;
var currentRequests = 0;
var selectedBookId = 0;
var requestLimit = 10;
var titleInputElement;
var authorInputElement;
var newTitle;
var newAuthor;
var queryParam;
var currentBooks;

function AddBook() {
    titleInputElement = titleInputElement = document.getElementById('title-input');
    authorInputElement = document.getElementById('author-input');
    newTitle = titleInputElement.value;
    newAuthor = authorInputElement.value;
    queryParam = '&title=' + newTitle + '&author=' + newAuthor;
    if (selectedBookId == 0){
        fetch(createOpUrl + queryParam)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status != "success" && currentRequests < requestLimit) {
                currentRequests++;
                AddBook();
            } else {  
                Refresh();
            }
        });
    } else {
        fetch(updateOpUrl + selectedBookId + queryParam)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status != "success" && currentRequests < requestLimit) {
                currentRequests++;
                AddBook();
            } else {
                document.getElementById('add-update-button').value = 'Add';   
                Refresh();
            }
        }); 
    }
}

function EditBook(bookId, selectedTitle, selectedAuthor) {
    selectedBookId = bookId;
    document.getElementById('author-input').value = selectedAuthor;
    document.getElementById('title-input').value = selectedTitle;
    document.getElementById('add-update-button').value = 'Click to update';  
}

function DeleteBook(bookId){
    fetch(deleteOpUrl + bookId)
    .then((response) => {
        
        return response.json()
    })
    .then((data) => {
        if (data.status != "success" && currentRequests < requestLimit) {
            currentRequests++;
            DeleteBook(bookId);
        } else {  
            Refresh();
        }
    });
}

function EmptyBookList() {
    currentBooks = document.getElementsByClassName('book-list-item');
    while (currentBooks.length > 0) {
        currentBooks[0].parentNode.removeChild(currentBooks[0]);
    }
}

function FillBookList(){
    fetch(readOpUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data['data'] == undefined && currentRequests < requestLimit) {
            currentRequests++;
            FillBookList();
        } else if(currentRequests >= requestLimit){
            Refresh();
        } else {
            console.log('Current books: ');
            const bookElementHtml = data['data'].map(book => {
                return `<div class="book-list-item w3-half" style="padding:50px">
                        <p>Author: ${book.author}<br>
                        Title: ${book.title} </p>
                        <button onclick="DeleteBook('${book.id}')">Delete</button>
                        <button onclick="EditBook('${book.id}', '${book.title}', '${book.author}')">Edit</button><br>
                        </div>` 
                    }).join('');
            document.querySelector('#book-list').insertAdjacentHTML('afterbegin', bookElementHtml);
            console.log(data['data']);
        }
    });
}

function RequestKey(){
    fetch(keyRequestUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(`New access key: ${data.key}`);
            localStorage.setItem('apiAccessKey', data.key);
            Refresh()
        });
}

function Refresh(){
    if(currentRequests >= requestLimit){
        alert('Error: too many failed requests. Try again later')
    }
    RefreshAccessUrl();
    EmptyBookList();
    FillBookList();
    currentRequests = 0;
    selectedBookId = 0;
    document.getElementById('author-input').value = ""
    document.getElementById('title-input').value = "";
    document.getElementById('store-header').innerText = `Book store seed #${currentKey}`;
}

function RefreshAccessUrl(){
    currentKey = localStorage.getItem('apiAccessKey');
    if(currentKey == null || currentKey == undefined){
        RequestKey();
        currentKey = localStorage.getItem('apiAccessKey');
        
    }
    accessUrl = baseUrl + currentKey;
    createOpUrl = accessUrl + '&op=insert';
    readOpUrl = accessUrl + '&op=select';
    updateOpUrl = accessUrl + '&op=update&id=';
    deleteOpUrl = accessUrl + '&op=delete&id=';

}

function BtnTimeout(button){
    button.disabled = true;
    setTimeout(function(){button.disabled = false;}, 1500);
}
