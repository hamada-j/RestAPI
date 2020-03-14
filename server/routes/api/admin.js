const router = require("express").Router();

// GET HTTP:LOCALHOST:3000/admin
router.get("/", function(req, res, next) {
  res.send("from admin url");
});

module.exports = router;
