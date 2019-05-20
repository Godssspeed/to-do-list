require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const cors = require("cors");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const {
  register,
  login,
  logout,
  creatList,
  getLists,
  deleteListItems,
  deleteListTitle
} = require("./controller/authController");

const app = express();
app.use(json());
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected");
});

// AUTH REQUESTS
app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);

app.post("/create/list", creatList);
app.get("/user/lists", getLists);
app.delete("/delete/listitems/:list_id", deleteListItems);
app.delete("/delete/listtitle/:id", deleteListTitle);

app.listen(SERVER_PORT || 4000, () => {
  console.log(`Listening on ${SERVER_PORT}`);
});
