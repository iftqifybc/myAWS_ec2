const http = require('http');
const express = require('express');

const app = express();
app.use(express.json({ limit: '10mb' }));

const books = [];

app.post('/books', async (req, res) => {

    const { book } = req.body;

    book.createAt = new Date;
    book.updateAt = new Date;
    book.deleteAt = null;

    books.push(book);

    res.status(200).json({ message: "ok", data: { book } });
    return;
});

app.get('/books/:name', async (req, res) => {

    const { name } = req.params;

    const book = books.filter(book => book.name === name);

    res.status(200).json({ message: "ok", data: { book } });
    return;
});

app.get('/books', async (req, res) => {

    res.status(200).json({ message: "ok", data: { books } });
    return;

});

app.put('/books/:name', async (req, res) => {

    const { name } = req.params;
    const { book } = req.body;

    const index = books.findIndex(book => book.name === name);

    if (index === -1) {
        res.status(200).json({ message: "ok", data: {} });
        return;
    }

    books[index].name = book.name;
    books[index].author = book.author;
    books[index].content = book.content;
    books[index].updateAt = new Date;

    res.status(200).json({ message: "ok", data: { book:books[index] } });
    return;
});

app.delete('/books/:name', async (req, res) => {

    const { name } = req.params;

    const index = books.findIndex(book => book.name === name);

    if (index === -1) {
        res.status(200).json({ message: "ok", data: {} });
        return;
    }

    books[index].deleteAt = new Date;
    
    res.status(200).json({ message: "ok", data: {} });
    return;
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
