const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);

app
  .route("/")
  .get(async (req, res) => {
    await client.connect();
    console.log("mongodb connected");
    const db = client.db("userDB");
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  })
  //POST new user
  .post(async (req, res) => {
    const userObj = req.body;
    console.log(req.body);

    const db = client.db("userDB");
    const data = await db.collection("users").insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    res.json(data);
  });

app.get("/getUsers", async (req, res) => {
  const db = client.db("userDB");
  data = await db.collection("users").find({}).toArray();
  res.json(data);
});


// Close ONCE on shutdown
process.on("SIGINT", () => {
  client.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
