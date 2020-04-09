const router = require("express").Router();

const OrderDetails = require("../../models/ordersdetails");

/* GET http://localhost:3000/api/ordersdetails */
router.get("/", async (req, res, next) => {
  try {
    const rows = await OrderDetails.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/api/ordersdetails/Id */
router.delete("/:orderDetailId", (req, res, next) => {
  OrderDetails.deleteById(req.params.orderDetailId)
    .then(result => {
      res.status(201).send("orderDetail deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/ordersdetails/Id */
router.get("/:ordersdetailsId", (req, res, next) => {
  OrderDetails.getById(req.params.ordersdetailsId)
    .then(orderDetail => {
      res.status(201).send(orderDetail);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/api/ordersdetails */
router.post("/", async (req, res, next) => {
  try {
    const result = await OrderDetails.create({
      fk_orders: req.body.fk_orders,
      fk_product: req.body.fk_product,
      quantity: req.body.quantity,
      discunt: req.body.discunt
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/ordersdetails/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await OrderDetails.update({
      fk_orders: req.body.fk_orders,
      fk_product: req.body.fk_product,
      quantity: req.body.quantity,
      discunt: req.body.discunt,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
