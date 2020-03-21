const express = require("express");
const router = express.Router();

const Region = require("../../models/region");

/* GET http://localhost:3000/api/region */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Region.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/region/Id */
router.delete("/:regionId", (req, res, next) => {
  Region.deleteById(req.params.regionId)
    .then(result => {
      console.log(result);
      res.status(201).send("Region deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//apiregion/Id */
router.get("/:regionId", (req, res, next) => {
  Region.getById(req.params.regionId)
    .then(region => {
      res.status(201).send(region);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/region */
router.post("/", async (req, res, next) => {
  try {
    const result = await Region.create({
      region: req.body.region
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/region/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Region.update({
      region: req.body.region,
      id: req.params.pId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
