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
const regionsRouter = require("./admin/regions");
const departamentRouter = require("./admin/departament");
const informationRouter = require("./admin/information");
const ordersdetailsRouter = require("./admin/ordersdetails");
const dashboardRouter = require("./admin/dashboard");

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/employee", employeeRouter);
router.use("/orders", ordersRouter);
router.use("/suppliers", suppliersRouter);
router.use("/regions", regionsRouter);
router.use("/departaments", departamentRouter);
router.use("/information", informationRouter);
router.use("/ordersdetails", ordersdetailsRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
