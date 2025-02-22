let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;
}

Book.prototype.getReadStatus = function() {
    return this.read;
}

Book.prototype.toggleReadStatus = function() {
   this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book);
    return book;
}

const cardContainer = document.querySelector("#card-container")
const addBookBtn = document.querySelector("#add-book");
const bookDialog = document.querySelector("dialog");
const dialogAddBookBtn = bookDialog.querySelector("#add-book");
const form = bookDialog.querySelector("form");


function createCardforBook(book) {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    const removeBtnImg = document.createElement("img");
    const buttonGroup = document.createElement("div");
    title.textContent = '"' + book.title + '"';
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";
    if (book.getReadStatus()) {
        readBtn.textContent = "Read";
        readBtn.setAttribute("class", "read-btn");
    } else {
        readBtn.textContent = "Not Read";
        readBtn.setAttribute("class", "not-read-btn");
    }

    readBtn.addEventListener("click", (event) => {
        let title = event.target.parentNode.parentNode.childNodes[0].textContent.replaceAll('"', '');
        let book = myLibrary.find((book) => book.title == title);
        book.toggleReadStatus();
        if (book.getReadStatus()) {
            event.target.textContent = "Read";
            event.target.setAttribute("class", "read-btn");
        } else {
            event.target.textContent = "Not Read";
            event.target.setAttribute("class", "not-read-btn");
        }
    })

    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.addEventListener("click", (event) => {
        let title = event.target.parentNode.parentNode.parentNode.childNodes[0].textContent.replaceAll('"', '');
        myLibrary = myLibrary.filter((book) => book.title != title);
        event.target.parentNode.parentNode.parentNode.remove()
    })
    removeBtnImg.setAttribute("src", "./images/delete.svg");
    removeBtnImg.setAttribute("alt", "delete book button");

    removeBtn.appendChild(removeBtnImg);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    buttonGroup.setAttribute("class", "button-group")
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(buttonGroup);
    card.setAttribute("class", "card");
    cardContainer.appendChild(card);
}

addBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = bookDialog.querySelector("#title").value;
    const author = bookDialog.querySelector("#author").value;
    const pages = bookDialog.querySelector("#pages").value;
    const read = bookDialog.querySelector("#read").checked;
    const book = addBookToLibrary(title, author, pages, read);
    createCardforBook(book);
    form.reset();
    bookDialog.close();
});