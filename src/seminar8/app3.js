const express = require("express");
const Book = require("./book");
const app = express();
const port = 3000;

const bookRouter = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", bookRouter);

let books = [
  new Book(1, "Dune", "sf", "Frank Herbert"),
  new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
  new Book(3, "Foundation", "sf", "Asimov"),
];

//
bookRouter
  .route("/books")
  .get((req, res) => {
    let filteredBooks = [];

    if (req.query.genre) {
      filteredBooks = books.filter((x) => x.genre === req.query.genre);
    } else {
      filteredBooks = books;
    }

    res.json(filteredBooks);
  })

  //post valid add
  .post((req, res) => {
    const { id, name, genre, author } = req.body;

    //validare simpla
    if (!id || !name || !genre || !author) {
      return res.status(400).json({ error: "Missing fields!" });
    }

    const newBook = new Book(id, name, genre, author);
    books.push(newBook);
    return res.json(newBook);
  });

//update book
bookRouter
  .route("/books/:bookId")
  .put((req, res) => {
    let book = books.find((b) => b.id === Number(req.params.bookId));

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // update
    book.name = req.body.name ?? book.name;
    book.genre = req.body.genre ?? book.genre;
    book.author = req.body.author ?? book.author;

    return res.json(book);
  })

  //delete
  .delete((req, res) => {
    const id = Number(req.params.bookId);

    const initialLength = books.length;
    books = books.filter((b) => b.id !== id);

    if (books.length === initialLength) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.json({ message: `Book ${id} deleted successfully` });
  });

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Running on the port " + port);
});
