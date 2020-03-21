const express = require("express");
const router = express.Router();

const Customer = require("../../models/customer");

// router.get("/", (req, res) => {
//   res.render("customers", { layout: "admin_layout" });
// });

router.get("/", async (req, res, next) => {
  try {
    const rows = await Customer.getAll();
    res.render("customers", { layout: "admin_layout", arrCustomers: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", (req, res, next) => {
  Customer.getAll((err, productos) => {
    if (err) return res.json(err);
    res.render("customers", { arrCustomers: productos });
  });
});

/* DELETE http://localhost:3000/api/customer/Id */
router.delete("/delete/:customerId", (req, res, next) => {
  Customer.deleteById(req.params.customerId)
    .then(result => {
      console.log(result);
      res.status(201).send("Order Customer");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/customer/Id */
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

/* POST http://localhost:3000/api/customer */
router.post("/", async (req, res, next) => {
  // console.log(req.body);
  try {
    const result = await Customer.create({
      name: req.body.name,
      address: req.body.address
      //fk_regionl: req.body.fk_region
    });
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/customer/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Customer.update({
      name: req.body.name,
      address: req.body.address,
      //fk_regionl: req.body.fk_region,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;