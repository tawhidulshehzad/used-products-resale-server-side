const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8mgm9lb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client
      .db("bookWorm")
      .collection("books-categories");
    const productsCollection = client.db("bookWorm").collection("products");

    // api start
    // categories api
    app.get("/books-categories", async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
    });
    // products api with id
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      if (id === "09") {
        query = {};
        const products = await productsCollection.find(query).toArray();
        res.send(products);
      } else {
        const filter = {
          category_id: id,
        };
        const products = await productsCollection.find(filter).toArray();
        res.send(products);
      }
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("book server is running");
});

app.listen(port, () => console.log(`book running on ${port}`));
