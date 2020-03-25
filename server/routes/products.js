const express = require("express");
const router = express.Router();
const multer = require("multer");
const middleware = require("../middleware/middleware");
const productsController = require("../controllers/products");
const storege = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./server/public/images/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storege,
  limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

///// GET from MongoDB-Atlas Clusters /////
router.get("/", productsController.getAll);
/////  POST In MongoDB-Atlas Clusters /////
router.post(
  "/",
  middleware,
  upload.single("productImage"),
  productsController.addProduct
);
///// GET single Product Method In MongoDB-Atlas Clusters /////
router.get("/:productId", productsController.productByID);
/////  PATCH edit a Product In MongoDB-Atlas Clusters /////
router.patch("/:productId", middleware, productsController.editProduct);
/////  DELETE Product from MongoDB-Atlas Clusters /////
router.delete("/:productId", middleware, productsController.deleteProduct);

module.exports = router;
