const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

app.use(
  cors({
    origin: [""],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
