const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("admin", {
    layout: "admin_layout"
  });
});

module.exports = router;
