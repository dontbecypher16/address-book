const express = require("express");
const dotenv = require("dotenv");
const { testDbConnection } = require("./config/db");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
//const session = require("express-session");
const createError = require("http-errors");
const path = require("path");
const passport = require("passport");

const app = express();
testDbConnection();
dotenv.config();
const port = 4000;

const Contact = require("./routes/contacts");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//read what to add to session such as secret, etc
//app.use(session());
app.use(csurf());

app.use(Contact);

app.use(function (req, res) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
