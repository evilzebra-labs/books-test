import Books from './classes/Books.js';

const form = document.querySelector('.add-books-form');
const booksList = document.querySelector('.book-list table tbody');
const noBooksRow = document.querySelector('.no-books');
const books = new Books('books');

// Function to toggle the empty message
const toggleEmptyRow = () => {
  noBooksRow.classList.toggle('hidden', books.getCount() > 0);
};

// Function to append a book element to the books list
const appendBookElement = (book) => {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><button class="remove-book">Remove</button></td>
    `;

  row.setAttribute('data-book-id', book.id);
  booksList.appendChild(row);
};

// Function to remove a book element from the books list
const removeBookElement = (bookId) => {
  // Find the book element using the book ID data attribute and remove it from the DOM
  const bookEl = document.querySelector(`tr[data-book-id="${bookId}"]`);
  bookEl.remove();
  // Toggle the empty message
  toggleEmptyRow();
};

// Function to render all the books in the books list
const renderBooks = () => {
  const booksArray = books.getBooks();
  booksArray.forEach((book) => {
    // Append the book element to the books list
    appendBookElement(book);
  });
};

// Event listener for the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the form data
  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');

  // Add the new book to the book collection
  const newBook = books.addBook({ title, author });

  // Toggle the empty message
  toggleEmptyRow();

  // Append the new book element to the books list
  appendBookElement(newBook);

  // Reset the form fields
  form.reset();
});

// Event listener for the remove book button click
booksList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-book')) {
    // Find the closest book element and get its book ID
    const bookToRemove = e.target.closest('tr').dataset.bookId;

    // Remove the book from the book collection
    books.removeBook(bookToRemove);

    // Remove the book element from the books list
    removeBookElement(bookToRemove);
  }
});

// Event listener when the DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Toggle the empty message
  toggleEmptyRow();
  // Render all the books in the books list
  renderBooks();
});
