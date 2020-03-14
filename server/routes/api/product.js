const router = require("express").Router();

const Product = require("../../models/product");

/* GET http://localhost:3000/api/product */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Product.getAll();
    console.log(rows);
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/api/product/Id */
router.delete("/:productId", (req, res, next) => {
  Product.deleteById(req.params.productId)
    .then(result => {
      console.log(result);
      res.status(201).send("Product deleted");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/product/Id */
router.get("/:productId", (req, res, next) => {
  Product.getById(req.params.productId)
    .then(product => {
      res.status(201).send(product);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/api/product */
router.post("/", async (req, res, next) => {
  try {
    const result = await Product.create({
      name: req.body.name,
      image: req.body.image,
      unitprice: req.body.unitprice,
      unitstock: req.body.unitstock,
      unitonorder: req.body.unitonorder,
      fk_supplier: req.body.fk_supplier,
      fk_category: req.body.fk_category
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/product/ID*/
router.patch("/:Id", async (req, res, next) => {
  console.log(req.params);
  try {
    const result = await Product.update({
      name: req.body.name,
      image: req.body.image,
      unitprice: req.body.unitprice,
      unitstock: req.body.unitstock,
      unitonorder: req.body.unitonorder,
      fk_supplier: req.body.fk_supplier,
      fk_category: req.body.fk_category,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
