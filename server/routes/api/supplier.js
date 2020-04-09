const express = require("express");
const router = express.Router();

const Supplier = require("../../models/supplier");

/* GET http://localhost:3000/api/supplier */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Supplier.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/supplier/Id */
router.delete("/:supplierId", (req, res, next) => {
  Supplier.deleteById(req.params.supplierId)
    .then(result => {
      res.status(201).send("Supplier deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/supplier/Id */
router.get("/:supplierId", (req, res, next) => {
  Supplier.getById(req.params.supplierId)
    .then(supplier => {
      res.status(201).send(supplier);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/supplier */
router.post("/", async (req, res, next) => {
  try {
    const result = await Supplier.create({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      url: req.body.url
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/supplier/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Supplier.update({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      url: req.body.url,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
