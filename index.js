const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

const categories = require("./data/categories.json");
const books = require("./data/products.json");

// categories api call
app.get("/", (req, res) => {
  res.send("new api run");
});

// product api call
app.get("/books-categories", (req, res) => {
  res.send(categories);
});

app.get("/category/:id", (req, res) => {
  const id = req.params.id;
  if (id === "09") {
    res.send(books);
  } else {
    const category_books = books.filter((book) => book.category_id === id);
    res.send(category_books);
  }
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const selectedBook = books.find((b) => b.id === id);
  res.send(selectedBook);
});

app.listen(port, () => {
  console.log("boook sop");
});
