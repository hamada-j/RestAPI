const express = require("express");
const router = express.Router();

const Supplier = require("../../models/supplier");

/* GET http://localhost:3000/admin/supplier/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Supplier.getAll();
    res.render("suppliers", { layout: "admin_layout", arrSuppliers: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET(delete) http://localhost:3000/admin/supplier/Id */
router.get("/delete/:supplierId", (req, res, next) => {
  Supplier.deleteById(req.params.supplierId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Supplier.getAll();
        res.render("suppliers", { layout: "admin_layout", arrSuppliers: rows });
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

/* GET http://localhost:3000/admin/supplier/Id */
router.get("/edit/:supplierId", (req, res, next) => {
  Supplier.getById(req.params.supplierId)
    .then(supplierDB => {
      res.render("suppliers", { layout: "admin_layout", supplier: supplierDB });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/*POST http://localhost:3000/admin/supplier/ */
router.post("/", async (req, res, next) => {
  try {
    const result = await Supplier.create({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region
    });
    console.log(result);
    try {
      const rows = await Supplier.getAll();
      res.render("suppliers", { layout: "admin_layout", arrSuppliers: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/admin/Supplier/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Supplier.update({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      id: req.params.Id
    });
    console.log(result);
    try {
      const rows = await Supplier.getAll();
      res.render("suppliers", { layout: "admin_layout", arrSuppliers: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
