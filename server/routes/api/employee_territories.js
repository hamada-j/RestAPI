const express = require("express");
const router = express.Router();

const EmployeeTerritories = require("../../models/employee_territories");

/* GET http://localhost:3000/api/employee_territories */
router.get("/", async (req, res, next) => {
  try {
    const rows = await EmployeeTerritories.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/employee_territories/Id */
router.delete("/:pId", (req, res, next) => {
  EmployeeTerritories.deleteById(req.params.pId)
    .then(result => {
      console.log(result);
      res.status(201).send("Employee_Territories deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/employee_territories/Id */
router.get("/:pId", (req, res, next) => {
  EmployeeTerritories.getById(req.params.pId)
    .then(empTerritories => {
      res.status(201).send(empTerritories);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/employee_territories */
router.post("/", async (req, res, next) => {
  try {
    const result = await EmployeeTerritories.create({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/employee_territories/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await EmployeeTerritories.update({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
