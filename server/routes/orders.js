var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.status(200).json({
    message: "get order "
  });
});

router.post("/", function(req, res, next) {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "posted a order correctly",
    createdOrder: order
  });
});

router.get("/:ordeId", function(req, res, next) {
  res.status(200).json({
    message: "get order with id",
    orderId: req.params.orderId
  });
});
router.delete("/:ordeId", function(req, res, next) {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order deleted ",
    orderId: orderId
  });
});

module.exports = router;
