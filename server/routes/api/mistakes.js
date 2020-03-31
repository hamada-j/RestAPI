const router = require("express").Router();
const Product = require("../../models/product");
router.get("/", async (req, res, next) => {
  try {
    const rows = await Product.getAllMistakes();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
