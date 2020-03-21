const express = require("express");
const router = express.Router();

const Order = require("../../models/order");

/* GET http://localhost:3000/admin/orders/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Order.getAll();
    res.render("orders", { layout: "admin_layout", ordArr: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/orders/delete/:pId */
router.get("/delete/:pId", (req, res, next) => {
  Order.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Order.getAll();
        res.render("orders", {
          layout: "admin_layout",
          ordArr: rows
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

/* GET http://localhost:3000/admin/order/Id */
router.get("/see/:pId", (req, res, next) => {
  Order.getById(req.params.pId)
    .then(orderOrd => {
      res.render("orders", {
        layout: "admin_layout",
        element: orderOrd
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/orders/Id */
router.get("/edit/:pId", (req, res, next) => {
  Order.getById(req.params.pId)
    .then(orderOrd => {
      res.render("orders", {
        layout: "admin_layout",
        element: orderOrd
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/admin/orders */
router.post("/", async (req, res, next) => {
  try {
    const result = await Order.create({
      fk_customer: req.body.k_customer,
      fk_employee: req.body.fk_employee,
      orderdate: req.body.orderdate,
      requiredate: req.body.requiredate,
      address: req.body.address
    });
    try {
      const rows = await Order.getAll();
      res.render("orders", {
        layout: "admin_layout",
        ordArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

/* PATCH http://localhost:3000/admin/order/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await Order.update({
      fk_customer: req.body.k_customer,
      fk_employee: req.body.fk_employee,
      orderdate: req.body.orderdate,
      requiredate: req.body.requiredate,
      address: req.body.address,
      id: req.params.Id
    });
    try {
      const rows = await Order.getAll();
      console.log(rows);
      res.status(201).json(rows);
      res.render("orders", {
        layout: "admin_layout",
        ordArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
