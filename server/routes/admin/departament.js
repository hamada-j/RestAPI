const express = require("express");
const router = express.Router();

const Departament = require("../../models/departament");

/* GET http://localhost:3000/admin/departament/ */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Departament.getAll();
    res.render("departaments", { layout: "admin_layout", arrDepart: rows });
  } catch (err) {
    res.status(500).json(err);
  }
});
/* POST http://localhost:3000//api/departament */
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Departament.create({
      name: req.body.name
    });
    try {
      const rows = await Departament.getAll();
      res.render("departaments", { layout: "admin_layout", arrDepart: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
/* GET http://localhost:3000/admin/departament/Id */
router.get("/edit/:departamentId", (req, res, next) => {
  Departament.getById(req.params.departamentId)
    .then(departament => {
      res.render("departaments", {
        layout: "admin_layout",
        element: departament
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/departament/Id */
router.get("/delete/:departamentId", (req, res, next) => {
  Departament.deleteById(req.params.departamentId)
    .then(async result => {
      console.log(result);
      try {
        const rows = await Departament.getAll();
        res.render("departaments", { layout: "admin_layout", arrDepart: rows });
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* PATCH http://localhost:3000/api/departament/ID*/
router.patch("/update/:pId", async (req, res, next) => {
  console.log(req.params);
  try {
    const result = await Departament.update({
      name: req.body.name,
      id: req.params.pId
    });
    try {
      const rows = await Departament.getAll();
      res.render("departaments", { layout: "admin_layout", arrDepart: rows });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
