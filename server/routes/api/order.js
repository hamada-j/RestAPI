const router = require("express").Router();

const Order = require("../../models/order");

/* GET http://localhost:3000/api/order */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Order.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/api/order/Id */
router.delete("/:orderId", (req, res, next) => {
  Order.deleteById(req.params.orderId)
    .then(result => {
      res.status(201).send("Order deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/order/Id */
router.get("/:orderId", (req, res, next) => {
  Order.getById(req.params.orderId)
    .then(order => {
      res.status(201).send(order);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/api/order */
router.post("/", async (req, res, next) => {
  try {
    const result = await Order.create({
      fk_customer: req.body.k_customer,
      fk_employee: req.body.fk_employee,
      orderdate: req.body.orderdate,
      requiredate: req.body.requiredate,
      address: req.body.address
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/order/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Order.update({
      fk_customer: req.body.k_customer,
      fk_employee: req.body.fk_employee,
      orderdate: req.body.orderdate,
      requiredate: req.body.requiredate,
      address: req.body.address,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
