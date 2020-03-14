const router = require("express").Router();

const apiAdminRouter = require("./api/admin");

const apiEmployeesRouter = require("./api/employee");

const apiCustomersRouter = require("./api/customer");
const apiSuppliersRouter = require("./api/supplier");

const apiProductsRouter = require("./api/product");

const apiOrdersRouter = require("./api/order");
const apiOrdersDetailsRouter = require("./api/ordersdetails");

router.use("/admin", apiAdminRouter);
router.use("/employee", apiEmployeesRouter);
router.use("/customer", apiCustomersRouter);
router.use("/supplier", apiSuppliersRouter);
router.use("/product", apiProductsRouter);
router.use("/order", apiOrdersRouter);
router.use("/orderdetails", apiOrdersDetailsRouter);

module.exports = router;
