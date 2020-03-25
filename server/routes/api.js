const router = require("express").Router();

const apiEmployeesRouter = require("./api/employee");
const apiCustomersRouter = require("./api/customer");
const apiSuppliersRouter = require("./api/supplier");
const apiProductsRouter = require("./api/product");
const apiInformationRouter = require("./api/information");
const apiOrdersRouter = require("./api/order");
const apiOrdersDetailsRouter = require("./api/ordersdetails");
const apiOrderOrdProdRouter = require("./api/order_ord_prod");
const apiTerritorieRouter = require("./api/territories");
const apiRegionRouter = require("./api/region");
const apiEmployeeTerritoriesRouter = require("./api/employee_territories");
const apiDepartamentRouter = require("./api/departament");
const apiCategoryRouter = require("./api/category");
const apiUsersRouter = require("./api/users");

router.use("/employee", apiEmployeesRouter);
router.use("/customer", apiCustomersRouter);
router.use("/supplier", apiSuppliersRouter);
router.use("/product", apiProductsRouter);
router.use("/order", apiOrdersRouter);
router.use("/orderdetails", apiOrdersDetailsRouter);
router.use("/region", apiRegionRouter);
router.use("/order_ord_prod", apiOrderOrdProdRouter);
router.use("/territorie", apiTerritorieRouter);
router.use("/employee_territories", apiEmployeeTerritoriesRouter);
router.use("/departament", apiDepartamentRouter);
router.use("/category", apiCategoryRouter);
router.use("/information", apiInformationRouter);
router.use("/users", apiUsersRouter);

module.exports = router;
