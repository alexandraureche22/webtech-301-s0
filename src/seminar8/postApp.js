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

// GET + filtrare optională
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

  //  POST cu VALIDARE
  .post((req, res) => {
    const { id, name, genre, author } = req.body;

    // 1. Validare câmpuri lipsă
    if (!id || !name || !genre || !author) {
      return res.status(400).json({
        error: "Missing fields. You must provide id, name, genre and author.",
      });
    }

    // 2. ID trebuie să fie număr
    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID must be a number.",
      });
    }

    // 3. ID unic
    if (books.some((b) => b.id == id)) {
      return res.status(400).json({
        error: "A book with this ID already exists.",
      });
    }

    // Dacă totul e ok → creare carte
    let newBook = new Book(id, name, genre, author);
    books.push(newBook);

    console.log("Updated books: ", books);

    return res.status(201).json(newBook);
  });

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Running on the port " + port);
});
