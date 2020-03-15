const express = require("express");
const router = express.Router();

const Departament = require("../../models/departament");

/* GET http://localhost:3000/api/departament */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Departament.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/departament/Id */
router.delete("/:departamentId", (req, res, next) => {
  Departament.deleteById(req.params.departamentId)
    .then(result => {
      console.log(result);
      res.status(201).send("Departament deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/departament/Id */
router.get("/:departamentId", (req, res, next) => {
  Departament.getById(req.params.departamentId)
    .then(departament => {
      res.status(201).send(departament);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/departament */
router.post("/", async (req, res, next) => {
  try {
    const result = await Departament.create({
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

/* PATCH http://localhost:3000/api/departament/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Departament.update({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      id: req.params.pId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
