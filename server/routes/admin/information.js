const express = require("express");
const router = express.Router();

const Product = require("../../models/product");

/* GET http://localhost:3000/api/information */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Product.getAllInfo();
    res.render("information", { layout: "admin_layout", infoArr: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});
/* GET http://localhost:3000/api/information/pDiscont */
router.get("/:pDicunt", (req, res, next) => {
  Product.getProductbyDiscont(req.params.pDicunt)
    .then(producDiscunt => {
      res.status(201).send(producDiscunt);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
