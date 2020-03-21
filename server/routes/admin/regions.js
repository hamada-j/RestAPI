const express = require("express");
const router = express.Router();

const Region = require("../../models/region");
const Territories = require("../../models/territories");

/* GET http://localhost:3000/admin/region&territories */
router.get("/", async (req, res, next) => {
  try {
    const rowsRegions = await Region.getAll();
    const rowTerritories = await Territories.getAll();
    res.render("regions", {
      layout: "admin_layout",
      regionsArr: rowsRegions,
      territoriesArr: rowTerritories
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/admin/region/delete/region/Id */
router.get("/delete/regions/:pId", (req, res, next) => {
  Region.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rowsRegions = await Region.getAll();
        const rowTerritories = await Territories.getAll();
        res.render("regions", {
          layout: "admin_layout",
          regionsArr: rowsRegions,
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

/* DELETE http://localhost:3000/admin/region/delete/territories/Id */
router.get("/delete/territories/:pId", (req, res, next) => {
  Territories.deleteById(req.params.pId)
    .then(async result => {
      console.log(result);
      try {
        const rowsRegions = await Region.getAll();
        const rowTerritories = await Territories.getAll();
        res.render("regions", {
          layout: "admin_layout",
          regionsArr: rowsRegions,
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

/* GET http://localhost:3000/admin/region/see/:pId */
router.get("/regions/see/:pId", (req, res, next) => {
  Region.getById(req.params.pId)
    .then(eleRegion => {
      res.render("regions", {
        layout: "admin_layout",
        elementRegion: eleRegion
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/territories/see/:pId */
router.get("/territories/see/:pId", (req, res, next) => {
  Territories.getById(req.params.pId)
    .then(eleTerritories => {
      res.render("regions", {
        layout: "admin_layout",
        elementTerritories: eleTerritories
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/admin/region/edit/Id */
router.get("/regions/edit/:pId", (req, res, next) => {
  Region.getById(req.params.pId)
    .then(region => {
      res.render("regions", {
        layout: "admin_layout",
        elementR: region
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
/* GET http://localhost:3000/admin/territories/edit/Id */
router.get("/territories/edit/:pId", (req, res, next) => {
  Territories.getById(req.params.pId)
    .then(territorie => {
      res.render("regions", {
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

/* POST http://localhost:3000/admin/regions/regions */
router.post("/regions", async (req, res, next) => {
  try {
    const result = await Region.create({
      region: req.body.region
    });
    try {
      const rowsRegions = await Region.getAll();
      const rowTerritories = await Territories.getAll();
      res.render("regions", {
        layout: "admin_layout",
        regionsArr: rowsRegions,
        territoriesArr: rowTerritories
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});
/* POST http://localhost:3000/admin/territories*/
router.post("/territories", async (req, res, next) => {
  try {
    const result = await Territories.create({
      zona: req.body.zona,
      fk_region: req.body.fk_region
    });
    try {
      const rowsRegions = await Region.getAll();
      const rowTerritories = await Territories.getAll();
      res.render("regions", {
        layout: "admin_layout",
        regionsArr: rowsRegions,
        territoriesArr: rowTerritories
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

/* PATCH http://localhost:3000/admin/regions/edit/ID*/
router.patch("/regions/edit/:pId", async (req, res, next) => {
  try {
    const result = await Region.update({
      region: req.body.region,
      id: req.params.pId
    });
    try {
      const rows = await OrderOrdProd.getAll();
      res.render("regions", {
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

/* PATCH http://localhost:3000//territories/edit/:pID*/
router.patch("/territories/edit/:pId", async (req, res, next) => {
  try {
    const result = await Territories.update({
      zona: req.body.zona,
      fk_region: req.body.fk_region,
      id: req.params.pId
    });
    try {
      const rows = await OrderOrdProd.getAll();
      res.render("regions", {
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
