let myLibrary = [];
const libraryButton = document.getElementById('libraryButton');
const addButton = document.getElementById('addButton');
const submitButton = document.getElementById('submitButton');
const fields = document.querySelectorAll('.fields');
const dlt = document.getElementById('delete');

//Book constructor
class book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    };
};

//New book form submission
function addBookToLibrary() {
    const newBookTitle = document.getElementById('titleField');
    const newBookAuthor = document.getElementById('authorField');
    const newBookPages = document.getElementById('pagesField');
    let bookTitleRepeated;
    let bookAuthorRepeated;
    let newBookRead = document.getElementById('readValue');
    const form = document.getElementById('form');
    

    if (newBookRead.checked === false) {
        newBookRead = 'No';
    } else {
        newBookRead = 'Yes';
    };

    for (let i = 0; i < myLibrary.length; i++) {        //Set duplicate flags
        if (myLibrary[i].title === newBookTitle.value) {
            bookTitleRepeated = true;
        };
        if (myLibrary[i].author === newBookAuthor.value) {
            bookAuthorRepeated = true;
        }
    };

    if (newBookTitle.value === '' | newBookAuthor.value === '' | newBookPages.value === '') {
        window.alert('Please fill out title, author, and number of pages.');
    } else {
        
        if (bookTitleRepeated === true && bookAuthorRepeated === true) {
            window.alert('That book is already in your library.');
        } else {
        
        const addBook = new book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead);
        myLibrary.push(addBook);

        newBookTitle.value = '';
        newBookAuthor.value = '';
        newBookPages.value = '';
        newBookRead.checked = false;
    
        form.classList.add('hidden');

        myLibrary.sort(function(a, b) {
            const textA = a.title.toUpperCase();
            const textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA >textB) ? 1 : 0;
        });
        };
    };
};

//Form validation
function validateBook() {
    if (this.value === '') {
        this.classList.add('red');
    } else {
        this.classList.remove('red');
    }
};

//Create cards for all items currently in the library
function showLibrary() {
    const cards = document.getElementsByClassName('card');      //Delete Old Cards
    for (let i = 0; i < cards.length; i) {
        cards[i].remove();
    }

    for (let i = 0; i < myLibrary.length; i++) {        //Show all cards
        const cardGrid = document.getElementById('cardGrid');

        const newCard = document.createElement('div');
        const cardButtonUpdate = document.createElement('button');
        const cardButtonDelete = document.createElement('button');    
        newCard.setAttribute('class','card');
        cardGrid.appendChild(newCard);
        cardButtonUpdate.setAttribute('class','cardButton updateButton');
        cardButtonDelete.setAttribute('class','cardButton deleteButton');
        cardButtonUpdate.textContent = 'Update Read?';
        cardButtonDelete.textContent = 'Delete From Library?';

        for (let j = 0; j < 4; j++) {
            const cardPrompt = document.createElement('div');
            const cardProperty = document.createElement('div');
            cardPrompt.setAttribute('class','prompt');
            cardProperty.setAttribute('class','property');
            
            switch (j) {
                case 0:
                    cardPrompt.textContent = 'Title:';
                    cardProperty.textContent = myLibrary[i].title;
                    break;
                case 1:
                    cardPrompt.textContent = 'Author:';
                    cardProperty.textContent = myLibrary[i].author;
                    break;
                case 2:
                    cardPrompt.textContent = 'Page Count:';
                    cardProperty.textContent = myLibrary[i].pages;
                    break;
                case 3:
                    cardPrompt.textContent = 'Read?:';
                    cardProperty.textContent = myLibrary[i].read;
            };

            newCard.appendChild(cardPrompt);
            newCard.appendChild(cardProperty);
        };

        newCard.appendChild(cardButtonUpdate);
        newCard.appendChild(cardButtonDelete);
            
    };
    let updateButtons = document.querySelectorAll('.updateButton');
    let deleteButtons = document.querySelectorAll('.deleteButton');
    updateButtons.forEach(btn => btn.addEventListener('click', updateRead));
    deleteButtons.forEach(btn => btn.addEventListener('click', deleteCard))
};

//Show form for book submission
function showHidden() {
    const form = document.getElementById('form');
    form.classList.remove('hidden');
}

//Update object's read property
function updateRead() {
    const currentRead = this.previousElementSibling;
    const currentTitle = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    
    if (currentRead.textContent === 'No') {     //Update card
        currentRead.textContent = 'Yes';
    } else {
        currentRead.textContent = 'No';
    };

    for (i = 0; i < myLibrary.length; i++) {        //Update Array
        if (myLibrary[i]?.title === currentTitle.textContent) {
            myLibrary[i].read = currentRead.textContent;
        };
    };
};

//Remove book from library
function deleteCard() {
    const card = this.parentElement;
    const bookTitle = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    card.remove();

    myLibrary.splice(myLibrary.findIndex(item => item.title === bookTitle),1);
};



libraryButton.addEventListener('click',showLibrary);
addButton.addEventListener('click',showHidden);
submitButton.addEventListener('click',addBookToLibrary);
fields.forEach(field => field.addEventListener('focus', validateBook));
fields.forEach(field => field.addEventListener('blur', validateBook));