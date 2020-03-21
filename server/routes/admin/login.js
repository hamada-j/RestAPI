const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

registerAction = require("../../middleware/log");
const Admin = require("../../model/admin");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  Admin.find({ email: req.body.email })
    .exec()
    .then(arrAdmin => {
      if (arrAdmin.length < 1) {
        // return res.render("login", { message: "Authentification Failed" });
        // return res.status(401).json({ message: "Authentification failed 1" });
        req.flash("error", "This is a test notification.1");
        return res.render("login");
      }
      bcrypt.compare(req.body.password, arrAdmin[0].password, (err, result) => {
        if (err) {
          // return res.render("login", { message: "Authentification Failed" });
          // return res.status(402).json({ message: "Authentification failed 2" });
          req.flash("error", "This is a test notification.2");
          return res.render("login");
        }

        if (result) {
          console.log(result);
          res.cookie("cookie_Admin", req.body.email);
          res.render("dashboard", { layout: "admin_layout" });
        }
        req.flash("error", "This is a test notification.3");
        res.render("login");
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/signup", (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
      if (admin.length >= 1) {
        return res.status(422).json({
          message: "email already exist in DB"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            admin
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Admin signup"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

module.exports = router;
