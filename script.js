let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author} with a length of ${pages}. Have ${read}.`
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