const express = require("express");
const router = express.Router();

const Territories = require("../../models/territories");

/* GET http://localhost:3000/admin/region&territories */
router.get("/", async (req, res, next) => {
  try {
    const rowTerritories = await Territories.getAll();
    res.render("territories", {
      layout: "admin_layout",
      territoriesArr: rowTerritories
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/region/delete/territories/Id */
router.get("/delete/territories/:pId", (req, res, next) => {
  Territories.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rowTerritories = await Territories.getAll();
        res.render("territories", {
          layout: "admin_layout",
          territoriesArr: rowTerritories
        });
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .catch(err => {
      res.status(501).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/territories/see/:pId */
router.get("/see/:pId", (req, res, next) => {
  Territories.getById(req.params.pId)
    .then(eleTerritories => {
      res.render("territories", {
        layout: "admin_layout",
        elementT: eleTerritories
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/territories/edit/Id */
router.get("/edit/:pId", (req, res, next) => {
  Territories.getById(req.params.pId)
    .then(territorie => {
      res.render("territories", {
        layout: "admin_layout",
        elementT: territorie
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/admin/territories*/
router.post("/", async (req, res, next) => {
  try {
    const result = await Territories.create({
      zona: req.body.zona,
      fk_region: req.body.fk_region
    });
    try {
      const rowTerritories = await Territories.getAll();
      res.render("territories", {
        layout: "admin_layout",
        territoriesArr: rowTerritories
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

/* PATCH http://localhost:3000//territories/edit/:pID*/
router.patch("/edit/:pId", async (req, res, next) => {
  try {
    const result = await Territories.update({
      zona: req.body.zona,
      fk_region: req.body.fk_region,
      id: req.params.pId
    });
    try {
      const rows = await OrderOrdProd.getAll();
      res.render("territories", {
        layout: "admin_layout",
        ordProdArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
