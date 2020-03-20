const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

const loginRouter = require("./admin/login");
const logoutRouter = require("./admin/logout");
//aqui
const productsRouter = require("./admin/products");
const customersRouter = require("./admin/customers");
const employeeRouter = require("./admin/employee");
const ordersRouter = require("./admin/orders");
const suppliersRouter = require("./admin/suppliers");

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/employee", employeeRouter);
router.use("/orders", ordersRouter);
router.use("/suppliers", suppliersRouter);

module.exports = router;
