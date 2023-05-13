const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/askbutton", (req, res) => {
  const sql = "SELECT * FROM member WHERE UserId = 2";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
  });
});

app.post("/askMembership", async (req, res) => {
  const { family, id } = req.body;
  // console.log(id)
  const sql = `INSERT INTO askform (FamilySize, UserId) VALUES ("${family}", "${id}");`
  db.query(sql, (err, data) => {
    if (err) throw err
    console.log("successful post")
  })
})

app.listen(3001, () => {
  console.log("running on port 3001");
});
