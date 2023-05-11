const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET"],
  })
);

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/ask", (req, res) => {
  const sql = "SELECT * FROM member WHERE UserId = 1";
  db.query(sql, (err, data) => {
    if (err) throw err;
    if (!data) return;
    res.send(data);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
