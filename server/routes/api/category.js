const express = require("express");
const router = express.Router();

const Category = require("../../models/category");

/* GET http://localhost:3000/api/category */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Category.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/category/Id */
router.delete("/:categoryId", (req, res, next) => {
  Category.deleteById(req.params.categoryId)
    .then(result => {
      res.status(201).send("Category deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/category/Id */
router.get("/:categoryId", (req, res, next) => {
  Category.getById(req.params.categoryId)
    .then(category => {
      res.status(201).send(category);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/category */
router.post("/", async (req, res, next) => {
  try {
    const result = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/category/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Category.update({
      name: req.body.name,
      description: req.body.description,
      id: req.params.pId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
