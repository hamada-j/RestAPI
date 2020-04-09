const express = require("express");
const router = express.Router();

const Product = require("../../models/product");

/* GET http://localhost:3000/admin/products/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Product.getAll();
    res.render("products", { layout: "admin_layout", prodArr: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/products/delete/:pId */
router.get("/delete/:pId", (req, res, next) => {
  Product.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Product.getAll();
        res.render("products", {
          layout: "admin_layout",
          prodArr: rows
        });
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

/* GET http://localhost:3000/admin/products/Id */
router.get("/see/:pId", (req, res, next) => {
  Product.getById(req.params.pId)
    .then(prodElemnt => {
      res.render("products", {
        layout: "admin_layout",
        prod: prodElemnt
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/products/Id */
router.get("/edit/:pId", (req, res, next) => {
  Product.getById(req.params.pId)
    .then(orderOrd => {
      res.render("products", {
        layout: "admin_layout",
        prod: orderOrd
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/admin/products */
router.post("/", async (req, res, next) => {
  try {
    const result = await Product.create({
      name: req.body.name,
      photo: req.body.photo,
      unitprice: req.body.unitprice,
      unitstock: req.body.unitstock,
      unitonorder: req.body.unitonorder,
      fk_supplier: req.body.fk_supplier,
      fk_category: req.body.fk_category
    });
    try {
      const rows = await Product.getAll();
      res.render("products", {
        layout: "admin_layout",
        prodArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

/* PATCH http://localhost:3000/admin/products/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Product.update({
      name: req.body.name,
      photo: req.body.photo,
      unitprice: req.body.unitprice,
      unitstock: req.body.unitstock,
      unitonorder: req.body.unitonorder,
      fk_supplier: req.body.fk_supplier,
      fk_category: req.body.fk_category,
      id: req.params.Id
    });
    try {
      const rows = await Product.getAll();
      res.render("products", {
        layout: "admin_layout",
        prodArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
