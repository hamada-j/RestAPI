const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Client = require("../model/client");

exports.signupClient = (req, res, next) => {
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
};

exports.loginClient = (req, res, next) => {
  Client.find({ email: req.body.email })
    .exec()
    .then(arrClient => {
      if (arrClient.length < 1) {
        return res.status(401).json({ message: "Authentification failed 1" });
      }
      bcrypt.compare(
        req.body.password,
        arrClient[0].password,
        (err, result) => {
          if (err) {
            return res
              .status(402)
              .json({ message: "Authentification failed 2" });
          }

          if (result) {
            const token = jwt.sign(
              {
                clientId: arrClient[0]._id,
                email: arrClient[0].email
              },
              process.env.jwt_key,
              {
                expiresIn: "1h"
              }
            );
            // res.render("client/login", { text: "test" });
            return res.status(200).json({
              message: "Authentification is good",
              token: token
            });
          }
          res.status(406).json({ message: "Authentification failed 3" });
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.deleteClient = (req, res, next) => {
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
};
