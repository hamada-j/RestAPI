const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

// GET Method
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(allProducts => {
      const response = {
        count: allProducts.length,
        products: allProducts.map(prod => {
          return {
            name: prod.name,
            price: prod.price,
            _id: prod._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/product/" + prod._id
            }
          };
        })
      };
      // if (allProducts.length >= 0) {
      res.status(200).json(response);
      // } else {
      //   res.status(404).json({
      //     message: "Array dont has products"
      //   });
      // }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// POST Method
router.post("/", (req, res, next) => {
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
        message: "Product created with status: 201",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/product/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// GET Method FOR ID PRODUCT
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id")
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
});
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update(
    { _id: id },
    {
      $set: updateOps
      //{ name: req.params.newName, price: req.params.newPrice }
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
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
