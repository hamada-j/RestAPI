const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Client = require("../model/client");

router.post("/signup", (req, res, next) => {
  Client.find({ email: req.body.email })
    .exec()
    .then(client => {
      if (client.length >= 1) {
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
            const client = new Client({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            client
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Client signup"
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

router.post("/login", (req, res, next) => {
  Client.find({ email: req.body.email })
    .exec()
    .then(arrClient => {
      if (arrClient.length < 1) {
        return res.status(401).json({ message: "Authentification failed" });
      }
      bcrypt.compare(
        req.body.password,
        arrClient[0].password,
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Authentification failed" });
          }
          if (result) {
            return res.status(200).json({
              message: "Authentification is good"
            });
          }
          res.status(401).json({ message: "Authentification failed" });
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:clientId", (req, res, next) => {
  Client.remove({ _id: req.params.clientId })
    .exec()
    .then(result => {
      res.status(201).json({
        message: "Client is deleted, bye!"
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
