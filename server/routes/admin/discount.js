const express = require("express");
const router = express.Router();

const Product = require("../../models/product");

/* GET http://localhost:3000/admin/discount */
router.get("/", (req, res, next) => {
  res.render("discount", { layout: "admin_layout" });
});

/* GET http://localhost:3000/admin/discount/pDiscont */
router.get("/:pDiscount", (req, res, next) => {
  console.log(req.params.pDiscount);
  Product.getProductbyDiscont(req.params.pDiscount)
    .then(producDiscunt => {
      console.log(producDiscunt);
      res.render("discount", {
        layout: "admin_layout",
        infoArr: producDiscunt
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
