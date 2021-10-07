let myLibrary = [];
const bookSection = document.querySelector('.bookSection');


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author} with a length of ${pages} pages. Have ${read}.`
    };
};

function addBookToLibrary(title, author, pages, read) {
    
    let book = new Book(title, author, pages, read);

    myLibrary.push(book);    
};



addBookToLibrary('Harry Potter', 'J.K. Rowling', '4050', 'not read yet');
addBookToLibrary('Dune', 'Frank Herbert', '400', 'read');
addBookToLibrary('Hunger Games', 'Idontevenknow', '6969', 'not read');
addBookToLibrary('Dune Messiah', 'Frank Herbert', '420', 'not read');



function displayBookOnPage() {
    
    myLibrary.forEach(function(book) {
        const div = document.createElement('div');
        div.classList.add('book');

        const header = document.createElement('h3');
        header.textContent = `${book.title}`;
        div.appendChild(header);

        const p = document.createElement('p');
        p.textContent = `${book.info()}`;
        div.appendChild(p);
        
        bookSection.appendChild(div);
    });
};

displayBookOnPage();