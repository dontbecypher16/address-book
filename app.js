const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { testDbConnection } = require("./config/db");
testDbConnection();

dotenv.config();
const port = 4000;
app.set("views", "./views");

app.use(express.static(__dirname + "/public/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Contact = require("./routes/contacts");

app.use(Contact);

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
