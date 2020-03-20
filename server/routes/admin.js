const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

const loginRouter = require("./admin/login");
//aqui
const productsRouter = require("./admin/products");
const customersRouter = require("./admin/customers");
const employeeRouter = require("./admin/employee");
const ordersRouter = require("./admin/orders");
const suppliersRouter = require("./admin/suppliers");

router.use("/login", loginRouter);
router.use("/products", productsRouter);

router.use("/customers", customersRouter);
router.use("/employee", employeeRouter);
router.use("/orders", middleware, ordersRouter);
router.use("/suppliers", middleware, suppliersRouter);

module.exports = router;
