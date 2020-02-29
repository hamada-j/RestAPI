var express = require("express");
var router = express.Router();

// get Method
router.get("/", function(req, res, next) {
  res.send("from products url");
});

// get Method
router.post("/", function(req, res, next) {
  res.send("from products url");
});

module.exports = router;
