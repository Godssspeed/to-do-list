require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const cors = require("cors");

const { CONNECTION_STRING, SERVER_PORT } = process.env;
const { register } = require("./controller/authController");

const app = express();
app.use(json());
app.use(cors());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected");
});

// AUTH REQUESTS
app.post("/auth/register", register);

app.listen(SERVER_PORT || 4000, () => {
  console.log(`Listening on ${SERVER_PORT}`);
});
