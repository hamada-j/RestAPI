const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("suppliers", { layout: "admin_layout" });
});

module.exports = router;
