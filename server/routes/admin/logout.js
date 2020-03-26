const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("cookie_Admin");
  req.session.destroy();
  res.redirect("login");
});

module.exports = router;
