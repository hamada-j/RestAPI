const express = require("express");
const router = express.Router();

const Region = require("../../models/region");

/* GET http://localhost:3000/admin/region&territories */
router.get("/", async (req, res, next) => {
  try {
    const rowsRegions = await Region.getAll();

    res.render("regions", {
      layout: "admin_layout",
      regionsArr: rowsRegions
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

        res.render("regions", {
          layout: "admin_layout",
          regionsArr: rowsRegions
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
        elementR: eleRegion
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

/* POST http://localhost:3000/admin/regions/regions */
router.post("/regions", async (req, res, next) => {
  try {
    const result = await Region.create({
      region: req.body.region
    });
    try {
      const rowsRegions = await Region.getAll();
      res.render("regions", {
        layout: "admin_layout",
        regionsArr: rowsRegions
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
      const rows = await Region.getAll();
      res.render("regions", {
        layout: "admin_layout",
        regionsArr: rows
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
