const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

const adminRouter = require("./admin/admin");
const loginRouter = require("./admin/login");
const logoutRouter = require("./admin/logout");
const forgotRouter = require("./admin/forgotPassword");
const resetRouter = require("./admin/reset");
const searchRouter = require("./admin/search");

const productsRouter = require("./admin/products");
const customersRouter = require("./admin/customers");
const employeeRouter = require("./admin/employee");
const ordersRouter = require("./admin/orders");
const suppliersRouter = require("./admin/suppliers");
const regionsRouter = require("./admin/regions");
const territoriesRouter = require("./admin/territories");
const departamentRouter = require("./admin/departament");
const categoryRouter = require("./admin/catagory");
const informationRouter = require("./admin/information");
const ordersdetailsRouter = require("./admin/ordersdetails");
const dashboardRouter = require("./admin/dashboard");

router.use("/admin", adminRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/forgotPassword", forgotRouter);
router.use("/reset", resetRouter);
router.use("/search", searchRouter);

router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/employee", employeeRouter);
router.use("/orders", ordersRouter);
router.use("/suppliers", suppliersRouter);
router.use("/regions", regionsRouter);
router.use("/territories", territoriesRouter);
router.use("/departaments", departamentRouter);
router.use("/category", categoryRouter);
router.use("/information", informationRouter);
router.use("/ordersdetails", ordersdetailsRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
