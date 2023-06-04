const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  const sql = `SELECT * FROM user WHERE UserName = '${user}'`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    if (data.length == 0) {
      res.send({ userERR: "user does not exist" });
    } else {
      bcrypt.compare(password, data[0].Password, (error, result) => {
        if (error) throw error;
        if (result) {
          res.send(data);
        } else {
          console.log("Wrong password and user name combinatio");
          res.send({ passERR: "Wrong password and user name combination" });
        }
      });
      // res.send(data);
    }
  });
});

app.post("/signUp", (req, res) => {
  const { Name, UserName, password, PhoneNo } = req.body;
  bcrypt.genSalt(11, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      // console.log(hash);
      const sql = `INSERT INTO eder.user (Name, UserName, Password, Phone_No, Access_Level) VALUE ("${Name}", "${UserName}", "${hash}", "${PhoneNo}", "User") `;
      db.query(sql, (err, data) => {
        if (err) throw err;
        console.log("successful");
        res.send("successful");
      });
    });
  });
});

app.get("/askbutton", (req, res) => {
  const sql = "SELECT * FROM members WHERE UserId = 3";
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

app.get("/askNotification", (req, res) => {
  const sql =
    "SELECT * FROM members WHERE UserId = 1  AND month(Date) = month(curdate()) AND year(Date) = year(curdate());";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
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
  console.log(userId);
  const sql = `INSERT INTO members (UserId, Team, FamilySize, AccessLevel, MembershipPay) VALUES ("${userId}", "${group}", "${FamilySize}", "${access}", "${pay}");`;

  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("successful insertion");
      const sql = `DELETE FROM askform WHERE ID = ${id}`;
      db.query(sql, (err, data) => {
        if (err) throw err;
        console.log("successful deletion");
      });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
