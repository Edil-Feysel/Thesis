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
  const sql = "SELECT * FROM members WHERE UserId = 2";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
  });
});

app.get("/newRequest", (req, res) => {
  const sql = "SELECT * FROM askform";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
    // console.log(data);
  });
});

app.get("/events", (req, res) => {
  const sql = "SELECT * FROM event";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/askMembership", async (req, res) => {
  const { family, id } = req.body;
  // console.log(id)
  const sql = `INSERT INTO askform (FamilySize, UserId) VALUES ("${family}", "${id}");`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log("successful post");
  });
});
app.post("/addNewMember", (req, res) => {
  const { id, FamilySize, userId, group, access, pay } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO members (UserId, Group, FamilySize, AccessLevel, MembershipPay) VALUES ("${userId}", "${group}", "${FamilySize}", "${access}", "${pay}");`;

  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("successful insertion");
      // const sql = `DELETE FROM askform WHERE ID = ${id}`;
      // db.query(sql, (err, data) => {
      //   if (err) throw err;
      //   console.log("successful deletion");
      // });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
