const express = require("express");
const nodemailer = require("nodemailer");
const moment = require("moment");
const jwt = require("jwt-simple");
const router = express.Router();
const cors = require("cors");
var async = require("async-waterfall");

/* GET http://localhost:3000/admin/region&territories */
router.get("/", (req, res, next) => {
  console.log(req.body);
  res.render("forgotPassword");
});

// router.post("/forgot", function (req, res, next) {
//   console.log(req.body.email);
//   async.waterfall(
//     [
//       function (done) {
//         crypto.randomBytes(20, function (err, buf) {
//           var token = buf.toString("hex");
//           done(err, token);
//         });
//       },
//       function (token, done) {
//         User.findOne({ email: req.body.email }, function (err, user) {
//           if (!user) {
//             console.log("error", "No account with that email address exists.");
//             req.flash("error", "No account with that email address exists.");
//             return res.redirect("/forgot");
//           }
//           console.log("step 1");
//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//           user.save(function (err) {
//             done(err, token, user);
//           });
//         });
//       },
//       function (token, user, done) {
//         console.log("step 2");

//         var smtpTrans = nodemailer.createTransport({
//           service: "Gmail",
//           auth: {
//             user: "myemail",
//             pass: "mypassword",
//           },
//         });
//         var mailOptions = {
//           to: user.email,
//           from: "testingnodejs@gmail.com",
//           subject: "Node.js Password Reset",
//           text:
//             "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
//             "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
//             "http://" +
//             req.headers.host +
//             "/reset/" +
//             token +
//             "\n\n" +
//             "If you did not request this, please ignore this email and your password will remain unchanged.\n",
//         };
//         console.log("step 3");

//         smtpTrans.sendMail(mailOptions, function (err) {
//           req.flash(
//             "success",
//             "An e-mail has been sent to " +
//               user.email +
//               " with further instructions."
//           );
//           console.log("sent");
//           res.redirect("/forgot");
//         });
//       },
//     ],
//     function (err) {
//       console.log("this err" + " " + err);
//       res.redirect("/");
//     }
//   );
// });

// step 1
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "testingemailnodejs@gmail.com",
    pass: "1234admin",
  },
});
// step 2
const createToken = (pUser) => {
  const payload = {
    usuarioId: pUser.id,
    fechaCreacion: moment().unix(),
    fechaExpiracion: moment().add(45, "minutes").unix(),
  };
  return jwt.encode(payload, "token");
};
let mailOptions = {
  from: "testingnodejs@gmail.com",
  to: "defjamvk@gmail.com",
  subject: "Node.js Password Reset",
  text:
    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    "http://reset/" +
    createToken("1") +
    "\n\n" +
    "If you did not request this, please ignore this email and your password will remain unchanged.\n",
};
// step 3
router.post("/forgot", function (req, res, next) {
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("error not sent");
      res.render("forgotPassword");
    } else {
      console.log("email is sent");
      res.render("reset");
    }
  });
});

router.get("/forgot", function (req, res) {
  res.render("forgot", {
    User: req.user,
  });
});

module.exports = router;
