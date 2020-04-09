const express = require("express");
const router = express.Router();

const Category = require("../../models/category");

/* GET http://localhost:3000/admin/Category */
router.get("/", async (req, res, next) => {
  try {
    const rowsCategory = await Category.getAll();

    res.render("category", {
      layout: "admin_layout",
      categoryArr: rowsCategory
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/Category/delete/Id */
router.get("/delete/:pId", (req, res, next) => {
  Category.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rowsCategory = await Category.getAll();

        res.render("category", {
          layout: "admin_layout",
          categoryArr: rowsCategory
        });
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .catch(err => {
      res.status(501).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/category/see/:pId */
router.get("/see/:pId", (req, res, next) => {
  Region.getById(req.params.pId)
    .then(eleCategory => {
      res.render("category", {
        layout: "admin_layout",
        element: eleCategory
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/category/edit/Id */
router.get("/edit/:pId", (req, res, next) => {
  Category.getById(req.params.pId)
    .then(region => {
      res.render("category", {
        layout: "admin_layout",
        element: region
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/admin/category */
router.post("/", async (req, res, next) => {
  try {
    const result = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    try {
      const rowsCategory = await Category.getAll();
      res.render("category", {
        layout: "admin_layout",
        categoryArr: rowsCategory
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

/* PATCH http://localhost:3000/admin/Category/edit/ID*/
router.patch("/edit/:pId", async (req, res, next) => {
  try {
    const result = await Category.update({
      name: req.body.name,
      description: req.body.description,
      id: req.params.pId
    });
    try {
      const rows = await Category.getAll();
      res.render("category", {
        layout: "admin_layout",
        categoryArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
