const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.cookies);
  //req.cookies[0].clearCookie();
  req.session.destroy();
  res.redirect("login");
});

module.exports = router;
