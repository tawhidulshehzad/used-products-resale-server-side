const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const categories = require("./data/categories.json");

// categories api call
app.get("/", (req, res) => {
  res.send("new api run");
});

// product api call
app.get("/books-categories", (req, res) => {
  res.send(categories);
});

// listen
app.listen(port, () => {
  console.log("boook sop");
});