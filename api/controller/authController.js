const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// const cookie = require("cookie-parser");

module.exports.home = function (req, res) {
  res.send("api working");
};

module.exports.signup = async (req, res) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phonenumber = req.body.phonenumber;

  let emailcheck = `SELECT email FROM user WHERE email = '${email}' `;

  db.query(emailcheck, async (err, result) => {
    if (err) throw err;

    console.log(result.length, "check email id");
    if (result.length > 0) {
      res.status(409).send({
        message: "Email already exists",
      });
    } else {
      const decrtpypwd = await bcrypt.hash(password, 10);

      let insertquery = `INSERT INTO user(firstname, lastname,username, email, password, phonenumber) VALUES('${firstname}','${lastname}', '${username}', '${email}', '${decrtpypwd}', '${phonenumber}')`;
      db.query(insertquery, async (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            message: "Registration successful",
          });
        }

        const transporter = nodemailer.createTransport({
          host: "Gmail",
          auth: {
            user: "nezirnezirevic310@gmail.com",
            pass: "rhrabjjvfjnfkerr",
          },
        });

        const mailOptions = {
          from: "nezirnezirevic310@gmail.com",
          to: "nezirevicnezir089@gmail.com",
          subject: "Sending email",
          text: "wooooow",
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(info.response);
        });
      });
    }
  });
};

module.exports.login = (req, res) => {
  console.log(req.body, "login");

  let username = req.body.username;
  let password = req.body.password;

  let checkusernamequery = `SELECT * FROM user WHERE username = '${username}' `;
  db.query(checkusernamequery, async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      let data = {
        username: result[0].username,
        password: result[0].password,
      };
      let checkpassword = await bcrypt.compare(password, result[0].password);
      console.log(checkpassword);
      if (checkpassword == true) {
        const token = jwt.sign({ data }, "secret", {
          expiresIn: "30m",
        });
        console.log(token);
        res.send({
          status: true,
          token: token,
          username: data.username,
          message: "Login succesfull",
        });
      } else {
        res.status(401).json({ err: "Unauthorized" });
      }
    } else {
      res.status(401).json({ err: "Unauthorized" });
    }
  });
};
