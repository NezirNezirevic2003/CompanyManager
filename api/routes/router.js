const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js");
const employeeController = require("../controller/employeeController.js");
const departmentController = require("../controller/departmentController.js");

router.get("/home", authController.home);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/employees", employeeController.employees);
router.post("/employee_post", employeeController.employee_post);
router.put("/update_employee/:id", employeeController.employee_update);
router.delete("/delete_employee/:id", employeeController.delete_employee);
router.get("/departments", departmentController.departments);
router.post("/post_department", departmentController.post_department);
router.put("/update_department/:id", departmentController.update_department);
router.delete("/delete_department/:id", departmentController.delete_department);

module.exports = router;
