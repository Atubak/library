let myLibrary = [];
const bookSection = document.querySelector('.bookSection');
const newBookButton = document.querySelector('.newBook');
let newBookForm = document.querySelector('p');
let submitButton = document.querySelector('p');




function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author} with a length of ${pages} pages. Have ${read}.`
    };
};



// call to add a book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
    
    let book = new Book(title, author, pages, read);

    myLibrary.push(book);    
};



// addBookToLibrary('Harry Potter', 'J.K. Rowling', '4050', 'not read yet');
// addBookToLibrary('Dune', 'Frank Herbert', '400', 'read');
// addBookToLibrary('Hunger Games', 'Idontevenknow', '6969', 'not read yet');
// addBookToLibrary('Dune Messiah', 'Frank Herbert', '420', 'not read yet');


// call to display the array on the page
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

        const header = document.createElement('h3');
        header.textContent = `${book.title}`;
        div.appendChild(header);

        const p = document.createElement('p');
        p.textContent = `${book.info()}`;
        div.appendChild(p);
        
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
    <input type= "radio" name="read" id="notread" value="not read yet">
    <label for="notread">Not Yet</label><br>
    <input type="radio" name="read" id="read" value="read">
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


// MOET KIJKEN WAAROM DE LIBRARY DE OUDE BOEKEN NOG EEN KEER WEERGEEFT