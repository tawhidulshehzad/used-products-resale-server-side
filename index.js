const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://<username>:<password>@cluster0.8mgm9lb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


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
