const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

module.exports.home = (req, res) => {
  res.send("api working");
};

module.exports.signup = (req, res) => {
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
      res.send({
        status: false,
        message: "Email already exists",
      });
    } else {
      decrtpypwd = await bcrypt.hash(password, 10);

      let insertquery = `INSERT INTO user(firstname, lastname,username, email, password, phonenumber) VALUES('${firstname}','${lastname}', '${username}', '${email}', '${decrtpypwd}', '${phonenumber}')`;
      db.query(insertquery, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          message: "Registration successful",
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
      let checkpassword = await bcrypt.compare(password, result[0].password);
      console.log(checkpassword);
      if (checkpassword == true) {
        res.send({
          status: true,
          message: "Login succesfull",
        });
      } else {
        res.send({
          status: false,
          message: "Invalid username or password",
        });
      }
    } else {
      res.send({
        status: false,
        message: "invalid username",
      });
    }
  });
};
