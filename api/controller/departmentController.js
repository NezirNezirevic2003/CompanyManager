const db = require("../config/dbConfig");

module.exports.departments = (req, res) => {
  let departmentQuery = "SELECT * FROM department";

  db.query(departmentQuery, (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({
        data: result,
      });
    }
  });
};

module.exports.post_department = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  let postDepartmentQuery = `INSERT INTO department(name, description) VALUES('${name}', '${description}')`;

  db.query(postDepartmentQuery, (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        message: "Department succesfully added",
        data: result,
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
      });
    }
  });
};

module.exports.update_department = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;

  let updateDepartmentQuery = `UPDATE department SET name = '${name}', description = '${description}' WHERE id = ${id}`;
  db.query(updateDepartmentQuery, (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        message: "Department is succesfully updated",
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
      });
    }
  });
};

module.exports.delete_department = (req, res) => {
  const id = req.params.id;

  let deleteDepartmentQuery = `DELETE FROM department WHERE id = ${id}`;

  db.query(deleteDepartmentQuery, (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        message: "Department is succesfully deleted",
      });
    }
  });
};
