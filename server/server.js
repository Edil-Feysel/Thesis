const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    schema: {
      tableName: "user_sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

app.use(
  session({
    key: "eder",
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 86000000,
    },
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
          req.session.user = data;
          res.send(req.session.user);
        } else {
          res.send({ passERR: "Wrong password and user name combination" });
        }
      });
    }
  });
});

// res.redirect('/login');

app.post("/signUp", (req, res) => {
  const { Name, UserName, password, PhoneNo } = req.body;
  bcrypt.genSalt(11, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      // console.log(hash);
      const sql = `INSERT INTO user (Name, UserName, Password, Phone_No, Access_Level) VALUE ("${Name}", "${UserName}", "${hash}", "${PhoneNo}", "User") `;
      db.query(sql, (err, data) => {
        if (err) throw err;
        console.log("successful");
        res.send("successful");
      });
    });
  });
});

app.get("/getUserInfo", async (req, res) => {
  const { ID } = req.query;
  const sql = `SELECT * FROM user WHERE ID = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// app.get("/askbutton", (req, res) => {
//   const sql = "SELECT * FROM members WHERE UserId = 3";
//   db.query(sql, (err, data) => {
//     if (err) throw err;
//     data ? res.send(data) : null;
//   });
// });

app.get("/newRequest", (req, res) => {
  const sql = "SELECT * FROM askform";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
  });
});

app.get("/askedBefore", (req, res) => {
  const { ID } = req.query;
  const sql = `SELECT * FROM askform WHERE UserId = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
    // console.log(data);
  });
});

app.get("/profile", (req, res) => {
  const { ID } = req.query;
  const sql = `SELECT * FROM user WHERE ID = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
    // console.log(data[0].Name);
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
  const { ID } = req.query;
  // console.log(ID);
  const sql = `SELECT * FROM members WHERE UserId = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      const MId = data[0].ID;
      // console.log(MId);
      const sql = `SELECT * FROM monthlypayment WHERE MembersId = ${MId} AND month(PaymentDate) = month(curdate()) AND year(PaymentDate) = year(curdate())`;
      db.query(sql, (err, dpay) => {
        if (err) throw err;
        dpay ? res.send(dpay) : null;
      });
    }
  });
});

app.post("/askMembership", async (req, res) => {
  const { family, id } = req.body;
  console.log(id, family);
  const sql = `INSERT INTO askform (FamilySize, UserId) VALUES ("${family}", "${id}");`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log("successful post");
  });
});

app.post("/profilePhoto", upload.single("file"), async (req, res) => {
  const { ID } = req.query;
  // console.log(ID);
  if (!req.file) {
    console.log("no file uploaded");
  } else {
    // console.log(req.file.filename);
    const imgsrc = "http://localhost:3001/images/" + req.file.filename;
    const sql = `UPDATE user SET Picture = "${imgsrc}" WHERE ID = ${ID}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log("we did it");
    });
  }
});

app.post("/addNewMember", (req, res) => {
  const { id, FamilySize, userId, group, access, pay } = req.body;
  // console.log(id);
  const sql = `UPDATE user SET Access_Level = "${access}" WHERE ID = ${userId};`;
  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("successful update");
      const sql = `INSERT INTO members (UserId, Team, FamilySize, MembershipPay) VALUES ("${userId}", "${group}", "${FamilySize}", "${pay}");`;
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
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
