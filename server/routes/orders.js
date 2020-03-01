const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const ordersController = require("../controllers/orders");

router.get("/", middleware, ordersController.ordersGetAll);

router.post("/", middleware, ordersController.orderPost);

router.get("/:orderId", middleware, ordersController.orderById);

router.delete("/:orderId", middleware, ordersController.orderDelete);

module.exports = router;
