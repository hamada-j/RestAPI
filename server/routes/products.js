const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

// GET Method
router.get("/", function(req, res, next) {
  res.status(200).json({
    message: "from product in get method"
  });
});

// POST Method
router.post("/", function(req, res, next) {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  res.status(201).json({
    message: "product posted with status 201",
    createdProduct: product
  });
});

// GET Method FOR ID PRODUCT
router.get("/:productId", function(req, res, next) {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "from GET SPECIAL products url",
      id: id
    });
  } else {
    res.status(200).json({
      message: "you passed an ID"
    });
  }
});
router.patch("/:productId", function(req, res, next) {
  res.status(200).json({
    message: "update the product "
  });
});

router.delete("/:productId", function(req, res, next) {
  res.status(200).json({
    message: "delete product "
  });
});

module.exports = router;
