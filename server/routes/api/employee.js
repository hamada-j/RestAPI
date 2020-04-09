const router = require("express").Router();

const Employee = require("../../models/employee");

/* GET http://localhost:3000/api/employee */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Employee.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/api/employee/Id */
router.delete("/:employeeId", (req, res, next) => {
  Employee.deleteById(req.params.employeeId)
    .then(result => {
      res.status(201).send("Order Employee");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/employee/Id */
router.get("/:employeeId", (req, res, next) => {
  Employee.getById(req.params.employeeId)
    .then(employee => {
      res.status(201).send(employee);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/api/employee */
router.post("/", async (req, res, next) => {
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
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/employee/ID*/
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
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
