const express = require("express");
const router = express.Router();

const Customer = require("../../models/customer");

// router.get("/", (req, res) => {
//   res.render("customers", { layout: "admin_layout" });
// });

/* GET http://localhost:3000/admin/customer/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Customer.getAll();
    res.render("customers", { layout: "admin_layout", arrCustomers: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET(delete) http://localhost:3000/admin/customer/Id */
router.get("/delete/:customerId", (req, res, next) => {
  Customer.deleteById(req.params.customerId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Customer.getAll();
        res.render("customers", { layout: "admin_layout", arrCustomers: rows });
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

/* GET http://localhost:3000/admin/customer/Id */
router.get("/:customerId", (req, res, next) => {
  Customer.getById(req.params.customerId)
    .then(customerDB => {
      console.log(customerDB);
      res.render("customers", { layout: "admin_layout", customer: customerDB });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/*POST http://localhost:3000/admin/customer/ */
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Customer.create({
      name: req.body.name,
      address: req.body.address,
      fk_region: req.body.fk_region
    });
    console.log(result);
    try {
      const rows = await Customer.getAll();
      res.render("customers", { layout: "admin_layout", arrCustomers: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/admin/customer/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Customer.update({
      name: req.body.name,
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
