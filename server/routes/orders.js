const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");
const ordersController = require("../controllers/orders");

///// GET  ORDERS Method In MongoDB-Atlas Clusters /////
router.get("/", middleware, ordersController.ordersGetAll);
///// POST  ORDER Method In MongoDB-Atlas Clusters /////
router.post("/", middleware, ordersController.orderPost);
///// GET/ID  ORDER Method In MongoDB-Atlas Clusters /////
router.get("/:orderId", middleware, ordersController.orderById);
///// DEL  ORDER Method In MongoDB-Atlas Clusters /////
router.delete("/:orderId", middleware, ordersController.orderDelete);

module.exports = router;
