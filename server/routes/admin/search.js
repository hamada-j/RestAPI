const express = require("express");
const router = express.Router();

/* GET http://localhost:3000/admin/ */
router.get("/", (req, res, next) => {
  console.log(req.body);
  res.render("search", { layout: "admin_layout" });
});

module.exports = router;
