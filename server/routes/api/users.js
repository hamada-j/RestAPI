const router = require("express").Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");

const { check, validationResult } = require("express-validator");

const User = require("../../models/users/user");

router.post(
  "/register",
  [
    check("username", "el nombre de usario de 3 a 10 valores")
      .isLength({ min: 3, max: 10 })
      .isAlphanumeric(),
    check("email", "el email debe ser correcto")
      .normalizeEmail()
      .isEmail(),
    check("password", "de 4 a 8 digitos")
      .exists()
      .custom(value => {
        return /^(?=.*\d).{4,8}$/.test(value);
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const passwordEnc = bcrypt.hashSync(req.body.password, 8);
    req.body.password = passwordEnc;
    try {
      const result = await User.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await User.emailExists(req.body.email);
    if (!user) {
      res.status(401).json({ error: "error en email y/o password" });
    }
    // console.log(req.body.password, user.password);
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if (iguales) {
      res.status(201).json({ success: createToken(user) });
    } else {
      res.status(401).json({ error: "error en email y/o password" });
    }
  } catch (err) {
    console.log(err);
  }
});

const createToken = pUser => {
  const payload = {
    usuarioId: pUser.id,
    fechaCreacion: moment().unix(),
    fechaExpiracion: moment()
      .add(15, "minutes")
      .unix()
  };
  return jwt.encode(payload, process.env.TOKEN);
};

module.exports = router;
