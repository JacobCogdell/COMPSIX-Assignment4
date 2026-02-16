const request = require('supertest');
const app = require('../server');

describe("Books API", () => {

    // GET All Books API Endpoint Test
    test("GET /api/books should return all books", async () => {
        const res = await request(app).get('/api/books');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // GET Particular Book By ID API Endpoint Test
    test("GET /api/books/1 should return a specific book", async () => {
        const res = await request(app).get('/api/books/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
    });

    // Try and Get Particular Book By Invalid ID API Endpoint Test
    test("GET /api/books/999 should return 404", async () => {
        const res = await request(app).get('/api/books/999');

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Book not found");
    });

    // Create New Book API Endpoint Test
    test("POST /api/books should create a new book", async () => {
        const newBook = {
            title: "Dune",
            author: "Frank Herbert",
            genre: "Sci-Fi",
            copiesAvailable: 4
        };

        const res = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Dune");
        expect(res.body.id).toBeDefined();
    });

    // Update Existing Book API Endpoint Test
    test("PUT /api/books/1 should update a book", async () => {
        const res = await request(app)
            .put('/api/books/1')
            .send({ title: "The Great Gatsby (Updated)" });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("The Great Gatsby (Updated)");
    });

    // Create new book with invalid input API Endpoint Test
    test("PUT /api/books/999 should return 404", async () => {
        const res = await request(app)
            .put('/api/books/999')
            .send({ title: "Doesn't matter" });

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Book not found");
    });

    // DELETE existing book API Endpoint Test
    test("DELETE /api/books/2 should delete a book", async () => {
        const res = await request(app).delete('/api/books/2');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Book deleted");
    });

    // DELETE book with invalid id API Endpoint Test
    test("DELETE /api/books/999 should return 404", async () => {
        const res = await request(app).delete('/api/books/999');

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Book not found");
    });

});