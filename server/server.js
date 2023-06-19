const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const axios = require("axios").default;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
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

app.post("/login", async (req, res) => {
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

app.post("/signUp", async (req, res) => {
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

app.get("/historyPay", (req, res) => {
  const { ID } = req.body;
  console.log(ID);
});

app.get("/newRequest", async (req, res) => {
  const sql = "SELECT * FROM askform";
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
  });
});

app.get("/askedBefore", async (req, res) => {
  const { ID } = req.query;
  const sql = `SELECT * FROM askform WHERE UserId = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
    // console.log(data);
  });
});

app.get("/profile", async (req, res) => {
  const { ID } = req.query;
  const sql = `SELECT * FROM user WHERE ID = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
    // console.log(data[0].Name);
  });
});

app.get("/events", async (req, res) => {
  const sql = "SELECT * FROM event";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/futureEvents", async (req, res) => {
  const sql = `SELECT * FROM event WHERE year(EventDate) = year(curdate()) AND month(EventDate) >= month(curdate()) AND date(EventDate) > date(curdate());`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    data ? res.send(data) : null;
  });
});

app.get("/askNotification", async (req, res) => {
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
  const {
    family,
    id,
    Kebele,
    occupation,
    applicant,
    spouseName,
    spouseBod,
    applicantBod,
    children,
    eContactName,
    ePhone,
  } = req.body;

  const sql = `INSERT INTO askform (FamilySize, UserId, Kebele, Occupation, Applicant, Spouse_Name, Spouse_Bod, Applicant_Bod, Children, eContactName, ePhone) VALUES ("${family}", "${id}",  "${Kebele}","${occupation}","${applicant}","${spouseName}","${spouseBod}","${applicantBod}","${children}","${eContactName}","${ePhone}");`;
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

app.post("/payment", async (req, res) => {
  const PORT = process.env.PORT || 4400;

  const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
  const CHAPA_AUTH = "CHASECK_TEST-XhD2k7sWyUsiPWQGtusAxLrq6k26nDvh";
  const config = {
    headers: {
      Authorization: ` Bearer ${CHAPA_AUTH}`,
    },
  };
  const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
  const RETURN_URL = `http://localhost:3000/dashboard`;

  const TEXT_REF = "tx-myecommerce12345-" + Date.now();
  const { name, phone_number, amount } = req.body;
  const data = {
    amount: amount,
    currency: "ETB",
    first_name: name,
    phone_number: phone_number,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
  };
  console.log(data);

  await axios
    .post(CHAPA_URL, data, config)
    .then((response) => {
      res.send(response.data.data.checkout_url);
    })
    .catch((err) => console.log(err));
});

app.post("/addSchedule", async (req, res) => {
  const { group, task, date, EventId } = req.body;
  console.log(group, task, date, EventId);
});

app.post("/addNewMember", async (req, res) => {
  const {
    id,
    FamilySize,
    userId,
    group,
    access,
    pay,
    Kebele,
    Occupation,
    Applicant,
    Spouse_Name,
    Spouse_Bod,
    Applicant_Bod,
    Children,
    eContactName,
    ePhone,
  } = req.body;

  const sql = `UPDATE user SET Access_Level = "${access}" WHERE ID = ${userId};`;
  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("successful update");
      const sql = `INSERT INTO members (UserId, Team, FamilySize, MembershipPay, Kebele, Occupation, Applicant, Spouse_Name, Spouse_Bod, Applicant_Bod, Children, eContactName, ePhone) VALUES ("${userId}", "${group}", "${FamilySize}", "${pay}", "${Kebele}", "${Occupation}", "${Applicant}", "${Spouse_Name}", "${Spouse_Bod}", "${Applicant_Bod}", "${Children}", "${eContactName}", "${ePhone}");`;
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

app.put("/updateUserInfo", async (req, res) => {
  const {
    ID,
    familySize,
    spouseName,
    spouseDOB,
    occupation,
    childern,
    eContactN,
    ePhone,
  } = req.body;
  console.log(
    ID,
    familySize,
    spouseName,
    spouseDOB,
    occupation,
    childern,
    eContactN,
    ePhone
  );
  const sql = `UPDATE members SET FamilySize = "${familySize}", Occupation = "${occupation}", Spouse_Name = "${spouseName}", Spouse_Bod = "${spouseDOB}", Children = "${childern}", eContactName = "${eContactN}", ePhone = "${ePhone}" WHERE UserId = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log("successful Upadate");
  });
});

app.put("/updatepass", async (req, res) => {
  const { ID, NewPass, password } = req.body;
  // console.log(ID, NewPass, password);
  const sql = `SELECT Password FROM user WHERE ID = ${ID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    // console.log(data);
    bcrypt.compare(password, data[0].Password, (error, result) => {
      if (error) throw error;
      if (result) {
        bcrypt.genSalt(11, (err, salt) => {
          bcrypt.hash(NewPass, salt, (err, hash) => {
            const sql = `UPDATE user SET Password = "${hash}" WHERE ID = ${ID}`;
            db.query(sql, (err, data) => {
              if (err) throw err;
              console.log("successfull update pass");
            });
          });
        });
      } else {
        res.send({ passErr: "Wrong Password" });
      }
    });
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
