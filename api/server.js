const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const db = require("./config/dbConfig");

db.connect((err) => {
  err
    ? console.log("db connecion failed")
    : console.log("db connection succesful");
});

const routes = require("./routes/router.js");
app.use(bodyparser.json());

app.use("/api", routes);
app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) throw err;
  console.log(`server running on http://localhost:5000`);
});
