let books = [];
//const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELP_APPS';
const inputSearchBook = document.getElementById("searchBookTitle");
const formSearchBook = document.getElementById("searchBook");



function generateId() {
    return +new Date();
}
 
function generatebookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}
 
//LOOKING UP THE BOOK ID
function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}
function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].generateID === bookId) {
            return index;
        }
    }
    return -1
}
 


/*boolean*/
function isStorageExist(){
  if (typeof (Storage) === undefined) {
    alert('Your browser doesn\'t support local storage');
    return false;
  }
  return true;
}
 
/*saving the data into string*/
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}




/*adding the books*/
function addBook() {
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const id = generateId();
  const bookObject = generatebookObject(id, title, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}




//SEARCHING THE BOOKS
document.getElementById('searchSubmit').addEventListener("click", function (event){
  event.preventDefault();
  const searchBook = document.getElementById('searchBookTitle').value.toLowerCase();
  const bookList = document.querySelectorAll('.itemBook > h3');
      for (xuxu of bookList) {
        if (searchBook !== xuxu.innerText.toLowerCase()) {
          xuxu.parentElement.style.display = "none";
        } else {
          xuxu.parentElement.style.display = "block";
      }
    }
  })

//SEARCH FILTER
function filter() {
  var value,name,profile,i;
  value = document.getElementById("value").value.toUpperCase();
  profile = document.getElementsByClassName("profile");
  for(i=0;i<profile.length;i++){
    name = profile[i].getElementsByClassName("name");
    if (name[0].innerHTML.toUpperCase().indexOf(value) > -1) {
      profile[i].style.display = "flex";
    }else{
      profile[i].style.display = "none";
    }
  }
}





//BUILDING THE SHELVES
function makeBook(bookObject) {
  const { id, title, author, year, isComplete } = bookObject;
  const bookEl = document.createElement('article');
  bookEl.classList.add('itemBook');
  bookEl.setAttribute('id', `book-${id}`);

  if (isComplete) {
    //SHELF FOR COMPLETED BOOKS
    const titleEl = document.createElement('h3');
    titleEl.classList.add('title');
    titleEl.textContent = `${title}`;

    const authorEl = document.createElement('p');
    authorEl.classList.add('author');
    authorEl.textContent = `Author: ${author}`;

    const yearEl = document.createElement('p');
    yearEl.classList.add('year');
    yearEl.textContent = `Year: ${year}`;

    const divEl = document.createElement('div');
    divEl.classList.add('action');

    //ADDING A MARK BUTTON
    const blueButton = document.createElement('button');
    blueButton.classList.add('blue');
    blueButton.textContent = 'Mark unfinished';
    blueButton.addEventListener('click', function () {
      unfinishedShelf(bookObject.id);
    });

    //ADDING A REMOVE BUTTON
    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Remove';
    redButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });

    //ADDING AN EDIT BUTTON
    const purpleButton=document.createElement('button');
    purpleButton.classList.add('purple');
    purpleButton.textContent='Edit';
    purpleButton.addEventListener('click', function () {
      editedBook(bookObject.id);
    });

    bookEl.append(titleEl, authorEl, yearEl, divEl);
    divEl.append(blueButton, redButton, purpleButton);
  } else {
    //SHELF FOR UNCOMPLETED BOOKS
    const titleEl = document.createElement('h3');
    titleEl.classList.add('title');
    titleEl.textContent = `${title}`;

    const authorEl = document.createElement('p');
    authorEl.classList.add('author');
    authorEl.textContent = `Author: ${author}`;

    const yearEl = document.createElement('p');
    yearEl.classList.add('year');
    yearEl.textContent = `Year: ${year}`;

    const divEl = document.createElement('div');
    divEl.classList.add('action');

    //ADDING A MARK BUTTON
    const blueButton = document.createElement('button');
    blueButton.classList.add('blue');
    blueButton.textContent = 'Mark finished';
    blueButton.addEventListener('click', function () {
      finishedShelf(bookObject.id);
    });

    //ADDING A REMOVE BUTTON
    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Remove';
    redButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });

    //ADDING AN EDIT BUTTON
    const purpleButton=document.createElement('button');
    purpleButton.classList.add('purple');
    purpleButton.textContent='Edit';
    purpleButton.addEventListener('click', function () {
      editedBook(bookObject.id);
    });

    bookEl.append(titleEl, authorEl, yearEl, divEl);
    divEl.append(blueButton, redButton, purpleButton);
  }

  return bookEl;

} 





//SHELF BUTTONS
function finishedShelf(bookId) {
    const bookTarget = findBook(bookId)
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function unfinishedShelf(bookId) {
    const bookTarget = findBook(bookId)
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId)
 
    if (books.bookTarget === -1) return;
 
    books.splice(bookTarget, 1)
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}




/**********************************************************************/
    /**********************************************************************/
    /**********************************************************************/
    /**********************************************************************/
/**UNDER CONSTRUCTION ZONE */
//INCOMPLETE
const BOOK_UNFINISHED = 'incompleteBookshelfList';
const BOOK_FINISHED = 'completeBookshelfList';

const editedBook = (bookElement) => { 
  const book = findBook(bookElement);

  document.getElementById('idEdit').value =  book.id;
  document.getElementById('titleEdit').value = book.title;
  document.getElementById('authorEdit').value = book.author;
  document.getElementById('yearEdit').value = book.year;

  //ACTIVATING POP-UP BUTTON
  const editPopUp = document.querySelector('.editPopUp');
  editPopUp.classList.add('active');

  const editClose = document.querySelector('.editCloseButton');
  editClose.addEventListener('click', function(){
      editPopUp.classList.remove('active');
  });

  //EVENT LISTENER WHEN A BOOK IS SUBMITTED

  /*
  const editForm = document.getElementById('editForm');
  editForm.addEventListener('submit', (event) => {
      editPopUp.classList.remove('active');
      bookElement.remove()
      updateEditedBook() 
  });
  */
  const editForm = document.getElementById('editSubmit');
  editForm.addEventListener('submit', (event) => {
      editPopUp.classList.remove('active');
      bookElement.remove()
      updateEditedBook() 
  });

}

const updateEditedBook = () => {
  const idEdit = document.getElementById('idEdit').value;
  const titleEdit = document.getElementById('titleEdit').value;
  const authorEdit =document.getElementById('authorEdit').value;
  const yearEdit = document.getElementById('yearEdit').value;

  const bookposition = findBookIndex(parseInt(idEdit));
  
  books[bookposition].title = titleEdit;
  books[bookposition].author = authorEdit;
  books[bookposition].year = yearEdit;

  saveData();
  refreshDataFromBook();
}

const refreshDataFromBook = () => {
  const bookUnfinished = document.getElementById(BOOK_UNFINISHED);
  const bookFinished = document.getElementById(BOOK_FINISHED);
      
   for (booker of books) {
    const newBook = makeBook(booker.id,booker.title, booker.author, booker.year, booker.isCompleted);
      
      if (booker.isCompleted) {
        bookFinished.append(newBook);
          } else {
            bookUnfinished.append(newBook);
          }
        }
      }



 
 




document.addEventListener('DOMContentLoaded', function () {
    const submitBooks = document.getElementById('inputBook');
    submitBooks.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();

    });

if (isStorageExist()) {
    loadDataFromStorage();
  }
 });

document.addEventListener(RENDER_EVENT, function () {
    const unfinishedBookshelf = document.getElementById("incompleteBookshelfList");
    unfinishedBookshelf.innerHTML = " ";
 
    const finishedBookshelf = document.getElementById("completeBookshelfList");
    finishedBookshelf.innerHTML = " ";
 
    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            unfinishedBookshelf.append(bookElement);
        } else {
          finishedBookshelf.append(bookElement);
        }
    }
});




