const express = require("express");
const router = express.Router();

const OrderOrdProd = require("../../models/order_ord_prod");

/* GET http://localhost:3000/api/order_ord_prod */
router.get("/", async (req, res, next) => {
  try {
    const rows = await OrderOrdProd.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000//api/order_ord_prod/Id */
router.delete("/:pId", (req, res, next) => {
  OrderOrdProd.deleteById(req.params.pId)
    .then(result => {
      console.log(result);
      res.status(201).send("OrderOrdProd deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000//api/order_ord_prod/Id */
router.get("/:pId", (req, res, next) => {
  OrderOrdProd.getById(req.params.pId)
    .then(orderOrdProd => {
      res.status(201).send(orderOrdProd);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000//api/order_ord_prod */
router.post("/", async (req, res, next) => {
  try {
    const result = await OrderOrdProd.create({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/order_ord_prod/ID*/
router.patch("/:pId", async (req, res, next) => {
  try {
    const result = await OrderOrdProd.update({
      company: req.body.company,
      contact: req.body.contact,
      address: req.body.address,
      fk_region: req.body.fk_region,
      id: req.params.pId
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
