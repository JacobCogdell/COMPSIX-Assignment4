const express = require('express');
const app = express();

app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    },
    {
        id: 4,
        title: "Fellowship of the Ring",
        author: "JRR Tolkien",
        genre: "Fantasy",
        copiesAvailable: 4
    }
    // Add more books if you'd like!
];

// API Endpoints
// GET /api/books - Retrieve all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id - Retrieve a specific book by ID
app.get('/api/books/:id', (req, res) => {
    // Convert the id to number
    const id = parseInt(req.params.id); 
    // Find the book in the books list
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, genre, copiesAvailable } = req.body;

    const newBook = {
        // Set the id to the next number
        id: books.length + 1,  
        title,
        author,
        genre,
        copiesAvailable
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT /api/books/:id - Update an existing book
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    // Update properties with the input fields
    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.genre = req.body.genre ?? book.genre;
    book.copiesAvailable = req.body.copiesAvailable ?? book.copiesAvailable;

    res.json(book);
});

// DELETE /api/books/:id - Remove a book
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(index, 1); // Remove from array

    res.json({ message: "Book deleted", book: deletedBook[0] });
});

module.exports = app;











