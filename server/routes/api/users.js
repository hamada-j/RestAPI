const router = require("express").Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");

const { check, validationResult } = require("express-validator");

const User = require("../../models/users/user");

router.post(
  "/register",
  [
    check("employeeNum", "EmployeeNumde should have 3 a 10 values")
      .isLength({ min: 3, max: 10 })
      .isAlphanumeric(),
    check("email", "most be correct one")
      .normalizeEmail()
      .isEmail(),
    check("password", "beetwen 4 and 8 values")
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
      console.log(result);
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
      res.status(401).json({ error: "Error in email or password." });
    }
    // console.log(req.body.password, user.password);
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if (iguales) {
      res.status(201).json({ success: createToken(user) });
    } else {
      res.status(401).json({ error: "Error en email or password" });
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
  return jwt.encode(payload, "token");
};

module.exports = router;
