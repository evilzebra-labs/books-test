export default class Books {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.books = this.getBooks(this.localStorageKey);
  }

  /**
   * Adds a new book to the collection.
   * @param {Object} book - The book object to be added.
   * @returns {Object} - The newly added book object.
   */
  addBook(book) {
    // Get the ID of the last book in the collection and increment it by 1
    const bookId = this.books.length ? this.books[this.books.length - 1].id + 1 : 1;
    const newBook = { id: bookId, ...book };
    this.books.push(newBook);
    this.saveBooksToLocalStorage();

    return newBook;
  }

  /**
   * Saves the collection of books to the local storage.
   */
  saveBooksToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.books));
  }

  /**
   * Removes a book from the collection based on its ID.
   * @param {string|number} bookId - The ID of the book to be removed.
   */
  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== parseInt(bookId, 10));
    this.saveBooksToLocalStorage();
  }

  /**
   * Retrieves the collection of books from the local storage.
   * @returns {Array} - The array of books retrieved from the local storage.
   */
  getBooks() {
    const books = localStorage.getItem(this.localStorageKey);
    return books ? JSON.parse(books) : [];
  }

  /**
   * Returns the number of books in the collection.
   * @returns {number} - The number of books in the collection.
   */
  getCount() {
    return this.books.length;
  }
}
