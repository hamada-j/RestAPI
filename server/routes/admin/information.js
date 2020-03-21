const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("information", { layout: "admin_layout" });
});

module.exports = router;
