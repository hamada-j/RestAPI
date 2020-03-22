const express = require("express");
const router = express.Router();
const Admin = require("../../model/admin");

// GET Method
router.get("/", (req, res, next) => {
  Admin.find()
    .select("_id email password")
    //.populate("product", "name")
    .exec()
    .then(allAdmins => {
      const response = {
        count: allAdmins.length,
        arrAdmin: allAdmins.map(admin => {
          return {
            _id: admin._id,
            email: admin.email,
            password: admin.password
          };
        })
      };
      console.log(response);
      res.render("admin", {
        layout: "admin_layout",
        Response: response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
