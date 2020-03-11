const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const middleware = require("../middleware/middleware");

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

const Product = require("../model/product");

router.get("/views/partials", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    //.populate("product", "name")
    .exec()
    .then(allProducts => {
      let image;
      for (let i = 0; i < allProducts.length; i++) {
        image = allProducts[i].productImage.slice(13);
      }
      res.render("partials/index", { prod: allProducts });
    });
});

// GET Method
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    //.populate("product", "name")
    .exec()
    .then(allProducts => {
      const response = {
        count: allProducts.length,
        products: allProducts.map(prod => {
          return {
            name: prod.name,
            price: prod.price,
            productImage: prod.productImage,
            _id: prod._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + prod._id
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
router.post(
  "/",
  middleware,
  upload.single("productImage"),
  (req, res, next) => {
    const imagePath = req.file.path.slice(13);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      // destination: req.body.destination,
      price: req.body.price,
      // quantity: req.body.quantity,
      productImage: imagePath
    });
    product
      .save()
      .then(result => {
        res.status(201).json({
          message: "Product created with status: 201",
          createdProduct: {
            name: result.name,
            price: result.price,
            productImage: result.productImage,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

// GET Method FOR ID PRODUCT
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(documente => {
      console.log("From Mongo:", documente);
      if (documente) {
        res.status(200).json({
          product: documente,
          request: {
            type: "http://localhost:3000/products"
          }
        });
      } else {
        res.status(404).json({ message: "Product Id Not Exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:productId", middleware, (req, res, next) => {
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
      res.status(200).json({
        message: "Product is Update fine",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", middleware, (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product is Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products/",
          dataBody: {
            name: "String",
            price: "Number"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
