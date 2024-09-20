// Get references to the form and the book list
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

// Array to hold the books
let books = [];

// Function to add a book
function addBook(title, author, isbn) {
  // Create a book object
  const book = {
    title,
    author,
    isbn
  };

  // Add book to the array and save to localStorage
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  // Display books in the table
  displayBooks();
}

// Function to display all books in the table
function displayBooks() {
  // Clear the current list
  bookList.innerHTML = '';

  // Loop through the books array and create table rows
  books.forEach((book, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button onclick="removeBook(${index})">Remove</button></td>
    `;

    bookList.appendChild(row);
  });
}

// Function to remove a book
function removeBook(index) {
  // Remove the book from the array
  books.splice(index, 1);

  // Update localStorage
  localStorage.setItem('books', JSON.stringify(books));

  // Refresh the list
  displayBooks();
}

// Handle form submission to add new books
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the values from the form inputs
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Add the book to the list
  addBook(title, author, isbn);

  // Clear form
  bookForm.reset();
});

// Load books from localStorage when the page loads
window.onload = function() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }
};