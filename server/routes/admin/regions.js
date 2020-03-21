const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("regions", { layout: "admin_layout" });
});

module.exports = router;
