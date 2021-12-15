let myLibrary = [];
const bookSection = document.querySelector('.bookSection');
const newBookButton = document.querySelector('.newBook');
let newBookForm;
let submitButton;
let removeButton;
let divRead;



// function Book(title, author, pages, read) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
//     this.info = function() {
//         return `${title} by ${author} with a length of ${pages} pages.`
//     };
//     this.toggleRead = function() {
//         if (this.read === 'Read') return this.read = 'Not Read Yet';
//         if (this.read === 'Not Read Yet') return this.read = 'Read';
//     };
// };

class Book {
    
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = () => {
        return `${this.title} by ${this.author} with a length of ${this.pages} pages`
    }

    toggleRead = () => {
        if (this.read === 'Read') return this.read = 'Not Read Yet';
        if (this.read === 'Not Read Yet') return this.read = 'Read';
    }
};


// call to add a book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
    
    let book = new Book(title, author, pages, read);

    myLibrary.push(book);    
};





// call to display the array objects on the page
function displayBooksOnPage() {
    // delete all old books first because it will add everything on top of the existing books!!on the page!! (the array is fine)
    let booksToDelete = document.querySelectorAll('.book');
    booksToDelete.forEach(function(book) {
        book.remove();
    });
    

    // then add them again with the newly added book included
    myLibrary.forEach(function(book) {
        const div = document.createElement('div');
        div.classList.add('book');
        div.setAttribute('data-bookObjectIndex', `${myLibrary.indexOf(book)}`);

        removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.textContent = 'X';
        removeButtonListener(); //allows the remove button listener to only start listening after the button is made on the page
        div.appendChild(removeButton);

        const header = document.createElement('h3');
        header.textContent = `${book.title}`;
        div.appendChild(header);
        
        const pInfo = document.createElement('p');
        pInfo.textContent = `${book.info()}`;
        div.appendChild(pInfo);

        divRead = document.createElement('div');
        divRead.classList.add('divRead');
        divRead.textContent = (`${book.read}` === 'Read') ? `✅ ${book.read}`:`❌ ${book.read}`;
        divRead.style['background-color'] = (`${book.read}` === 'Read') ? 'green':'orangered';
        readButtonListener(); //allows the read button listener to only start listening after the button is made on the page
        div.appendChild(divRead);
        
        bookSection.insertBefore(div, newBookButton);
    });

};


// Making a form appear after clicking the new-book-button
newBookButton.addEventListener('click', () => {
    bookSection.removeChild(newBookButton);
    
    newBookForm = document.createElement('div');
    newBookForm.classList.add('newBookForm');
    
    const makeForm = document.createElement('form');
    makeForm.innerHTML = `<label for="title">Title:</label><br>
    <input type="text" id="title" name="title"><br>
    <label for="author">Author:</label><br>
    <input type="text" id="author" name="author"><br>
    <label for="pages">Number of Pages:</label><br>
    <input type="number" id="pages" name="pages"><br>
    <p>Have You Read It Already?</p>
    <input type= "radio" name="read" id="notread" value="Not Read Yet">
    <label for="notread">Not Yet</label><br>
    <input type="radio" name="read" id="read" value="Read">
    <label for="read">Yep!</label><br>
    <button type="button" id="submitButton">Submit</button>`;
    
    
    newBookForm.appendChild(makeForm);
    
    bookSection.appendChild(newBookForm);
    submitButton = document.querySelector('#submitButton');
    submitButtonListener(); //allows the submit event listener to only start listening after the form is made
});




// taking the info from the form and inserting it in the addBookToLibrary function
function submitButtonListener() {
    submitButton.addEventListener('click', () => {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('input[name="read"]:checked').value;
        
        bookSection.removeChild(newBookForm);
        
        bookSection.appendChild(newBookButton);
        addBookToLibrary(title, author, pages, read);
        displayBooksOnPage();
    });};
    

 
function removeButtonListener() {    
    removeButton.addEventListener('click', (event) => {
        let bookToBeRemoved = event.path[1];
        let bookToBeRemovedObjectIndex = bookToBeRemoved.getAttribute('data-bookObjectIndex');

        if (confirm('This action will delete the book from your library.')) {
            bookSection.removeChild(bookToBeRemoved);
            myLibrary.splice(bookToBeRemovedObjectIndex, 1);
        } else return;

    });
};    



function readButtonListener() {
    divRead.addEventListener('click', (event) => {
        let bookToBeToggledObjectIndex = event.path[1].getAttribute('data-bookObjectIndex');
        myLibrary[bookToBeToggledObjectIndex].toggleRead();
        
        return displayBooksOnPage(); //to refresh the page so that the button updates color etc
    })
};





// Sample books
    addBookToLibrary('Harry Potter', 'J.K. Rowling', '4050', 'Not Read Yet');
    addBookToLibrary('Dune', 'Frank Herbert', '400', 'Read');
    addBookToLibrary('Hunger Games', 'Idontevenknow', '6969', 'Not Read Yet');
    addBookToLibrary('Dune Messiah', 'Frank Herbert', '420', 'Not Read Yet');



displayBooksOnPage();