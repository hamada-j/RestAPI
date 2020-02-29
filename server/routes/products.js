const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

// GET Method
router.get("/", function(req, res, next) {
  Product.find()
    .exec()
    .then(allProducts => {
      console.log(allProducts);
      if (allProducts.length >= 0) {
        res.status(200).json(allProducts);
      } else {
        res.status(404).json({
          message: "Array dont has products"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
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
      res.status(201).json({
        message: "Product posted with status: 201",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// GET Method FOR ID PRODUCT
router.get("/:productId", function(req, res, next) {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(documente => {
      console.log("From Mongo:", documente);
      if (documente) {
        res.status(200).json(documente);
      } else {
        res.status(404).json({ message: "Product Id Not Exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // if (id === "special") {
  //   res.status(200).json({
  //     message: "from GET SPECIAL products url",
  //     id: id
  //   });
  // } else {
  //   res.status(200).json({
  //     message: "you passed an ID"
  //   });
  // }
});
router.patch("/:productId", function(req, res, next) {
  res.status(200).json({
    message: "update the product "
  });
});

router.delete("/:productId", function(req, res, next) {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
