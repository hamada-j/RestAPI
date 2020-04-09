const express = require("express");
const router = express.Router();

const OrderOrdProd = require("../../models/order_ord_prod");

/* GET http://localhost:3000/admin/order_ord_prod */
router.get("/", async (req, res, next) => {
  try {
    const rows = await OrderOrdProd.getAll();
    res.render("ordersdetails", { layout: "admin_layout", ordProdArr: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/order_ord_prod/Id */
router.get("/delete/:pId", (req, res, next) => {
  OrderOrdProd.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await OrderOrdProd.getAll();
        res.render("ordersdetails", {
          layout: "admin_layout",
          ordProdArr: rows
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

/* GET http://localhost:3000/admin/order_ord_prod/Id */
router.get("/see/:pId", (req, res, next) => {
  OrderOrdProd.getById(req.params.pId)
    .then(orderOrdProd => {
      res.render("ordersdetails", {
        layout: "admin_layout",
        element: orderOrdProd
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/order_ord_prod/Id */
router.get("/edit/:pId", (req, res, next) => {
  OrderOrdProd.getById(req.params.pId)
    .then(orderOrdProd => {
      res.render("ordersdetails", {
        layout: "admin_layout",
        element: orderOrdProd
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/admin/order_ord_prod */
router.post("/", async (req, res, next) => {
  try {
    const result = await OrderOrdProd.create({
      fk_orders: req.body.fk_orders,
      fk_product: req.body.fk_product,
      quantity: req.body.quantity,
      discunt: req.body.discunt
    });
    try {
      const rows = await OrderOrdProd.getAll();
      res.render("ordersdetails", {
        layout: "admin_layout",
        ordProdArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/admin/order_ord_prod/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await OrderOrdProd.update({
      fk_orders: req.body.fk_orders,
      fk_product: req.body.fk_product,
      quantity: req.body.quantity,
      discunt: req.body.discunt,
      id: req.params.pId
    });
    try {
      const rows = await OrderOrdProd.getAll();
      res.render("ordersdetails", {
        layout: "admin_layout",
        ordProdArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
