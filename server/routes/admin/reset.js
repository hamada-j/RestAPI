const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.cookies);
  //req.cookies[0].clearCookie();
  res.render("reset");
});

router.get("/reset/:token", function(req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      console.log(user);
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset", {
        User: req.user
      });
    }
  );
});

router.post("/reset/:token", function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          function(err, user, next) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            console.log("password" + user.password + "and the user is" + user);

            user.save(function(err) {
              if (err) {
                console.log("here");
                return res.redirect("back");
              } else {
                console.log("here2");
                req.logIn(user, function(err) {
                  done(err, user);
                });
              }
            });
          }
        );
      },

      function(user, done) {
        // console.log('got this far 4')
        var smtpTrans = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "myemail",
            pass: "mypass"
          }
        });
        var mailOptions = {
          to: user.email,
          from: "myemail",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            " - This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTrans.sendMail(mailOptions, function(err) {
          // req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ],
    function(err) {
      res.redirect("/");
    }
  );
});
module.exports = router;
