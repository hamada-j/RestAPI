const express = require("express");
const router = express.Router();

const Employee = require("../../models/employee");

/* GET http://localhost:3000/admin/employee/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Employee.getAll();
    res.render("employee", { layout: "admin_layout", arrEmployee: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET(delete) http://localhost:3000/admin/employee/Id */
router.get("/delete/:employeeId", (req, res, next) => {
  Employee.deleteById(req.params.employeeId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Employee.getAll();
        res.render("employee", { layout: "admin_layout", arrEmployee: rows });
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/employee/Id */
router.get("/edit/:employeeId", (req, res, next) => {
  Employee.getById(req.params.employeeId)
    .then(employeeDB => {
      console.log(employeeDB);
      res.render("employee", { layout: "admin_layout", employee: employeeDB });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/*POST http://localhost:3000/admin/employee/ */
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Employee.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      photo: req.body.photo,
      birthdate: req.body.birthdate,
      salary: req.body.salary,
      fk_departamen: req.body.fk_departamen
    });
    console.log(result);
    try {
      const rows = await Employee.getAll();
      res.render("employee", { layout: "admin_layout", arrEmployee: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/admin/employee/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Employee.update({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      photo: req.body.photo,
      birthdate: req.body.birthdate,
      salary: req.body.salary,
      fk_departamen: req.body.fk_departamen,
      id: req.params.Id
    });
    try {
      const rows = await Employee.getAll();
      res.render("employee", { layout: "admin_layout", arrEmployee: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
