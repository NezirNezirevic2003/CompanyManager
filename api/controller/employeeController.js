const db = require("../config/dbConfig");

module.exports.employees = (req, res) => {
  let getEmployeeQuery = "SELECT * FROM employee";

  db.query(getEmployeeQuery, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({
        message: "User",
        data: result,
      });
    }
  });
};

module.exports.employee_post = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const dateOfJoining = req.body.dateOfJoining;
  const status = req.body.status;
  const salary = req.body.salary;
  const phonenumber = req.body.phonenumber;

  let checkEmail = `SELECT email FROM employee WHERE email = '${email}' `;
  db.query(checkEmail, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({
        status: false,
        message: "Email already exists",
      });
    } else {
      let insertEmployeeQuery = `INSERT into employee(firstname, lastname, email, dateOfJoining, status, salary, phonenumber) VALUES('${firstname}', '${lastname}', '${email}', '${dateOfJoining}', '${status}', '${salary}', '${phonenumber}')`;
      db.query(insertEmployeeQuery, (err, result) => {
        if (err) throw err;
        if (result) {
          res.send({
            status: true,
            message: "Employee added successfully",
          });
        }
        console.log(result);
      });
    }
  });
};

module.exports.employee_update = (req, res) => {
  const id = req.params.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const dateOfJoining = req.body.dateOfJoining;
  const status = req.body.status;
  const salary = req.body.salary;
  const phonenumber = req.body.phonenumber;

  let updateEmployeeQuery = `UPDATE employee SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', dateOfJoining = '${dateOfJoining}', status = '${status}', salary = '${salary}', phonenumber = '${phonenumber}' WHERE id = ${id}`;

  db.query(updateEmployeeQuery, (err, result) => {
    if (err) throw err;
    console.log(result);

    if (result) {
      res.send({
        status: true,
        message: "Employee was updated succesfully",
      });
    }
  });
};

module.exports.delete_employee = (req, res) => {
  const id = req.params.id;

  let deleteEmployeeQuery = `DELETE from employee WHERE id = '${id}'`;

  db.query(deleteEmployeeQuery, (err, result) => {
    if (err) throw err;
    console.log(result);

    if (result) {
      res.send({
        status: true,
        message: "Employee was deleted succesfully",
      });
    }
  });
};
