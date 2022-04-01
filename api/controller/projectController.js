const db = require("../config/dbConfig");

module.exports.projects = (req, res) => {
  let projectsQuery = "SELECT * FROM project";

  db.query(projectsQuery, (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({
        data: result,
      });
    }
  });
};

module.exports.project_post = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const tag = req.body.tag;
  const status = req.body.status;
  const employees = req.body.employees;

  let insertProjectQuery = `INSERT into project(name, description, tag, status, employees ) VALUES('${name}', '${description}', '${tag}', '${status}', '${employees}')`;
  let checkProjectName = `SELECT name FROM project WHERE name = '${name}' `;

  db.query(checkProjectName, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.status(409).send({
        error: "Name already exists",
      });
    } else {
      db.query(insertProjectQuery, (err, result) => {
        if (err) throw err;
        if (result) {
          res.status(200).send({
            message: "Project added successfully",
          });
        }
      });
    }
  });
};

module.exports.project_update = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const tag = req.body.tag;
  const status = req.body.status;
  const employees = req.body.employees;

  let updateProjectQuery = `UPDATE project SET name = '${name}', description = '${description}', tag = '${tag}', status = '${status}', employees = '${employees}' WHERE id = ${id}`;
  db.query(updateProjectQuery, (err, result) => {
    if (err) throw err;
    console.log(result);

    if (result) {
      res.status(200).send({
        message: "Project was updated succesfully",
      });
    }
  });
};
