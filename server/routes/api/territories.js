const express = require("express");
const router = express.Router();

const Territories = require("../../models/territories");

/* GET http://localhost:3000/api/territories */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Territories.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/territories/Id */
router.delete("/:terrId", (req, res, next) => {
  Territories.deleteById(req.params.terrId)
    .then(result => {
      console.log(result);
      res.status(201).send("Territories deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/territories/Id */
router.get("/:terrId", (req, res, next) => {
  Territories.getById(req.params.terrId)
    .then(terr => {
      res.status(201).send(terr);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/territories */
router.post("/", async (req, res, next) => {
  try {
    const result = await Territories.create({
      zona: req.body.zona,
      fk_region: req.body.fk_region
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/territories/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Territories.update({
      zona: req.body.zona,
      fk_region: req.body.fk_region,
      id: req.params.pId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
