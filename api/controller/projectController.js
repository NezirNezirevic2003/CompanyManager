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

  db.query(insertProjectQuery, (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({
        data: result,
      });
    }
  });
};
