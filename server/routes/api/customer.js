const router = require("express").Router();

const Customer = require("../../models/customer");

/* GET http://localhost:3000/api/customer */
router.get("/", async (req, res, next) => {
  try {
    const rows = await Customer.getAll();
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE http://localhost:3000/api/customer/Id */
router.delete("/:customerId", (req, res, next) => {
  Customer.deleteById(req.params.customerId)
    .then(result => {
      res.status(201).send("Order Customer");
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* GET http://localhost:3000/api/customer/Id */
router.get("/:customerId", (req, res, next) => {
  Customer.getById(req.params.customerId)
    .then(customer => {
      res.status(201).send(customer);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/api/customer */
router.post("/", async (req, res, next) => {
  // console.log(req.body);
  try {
    const result = await Customer.create({
      name: req.body.name,
      address: req.body.address,
      fk_region: req.body.fk_region
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PATCH http://localhost:3000/api/customer/ID*/
router.patch("/:Id", async (req, res, next) => {
  try {
    const result = await Customer.update({
      name: req.body.name,
      address: req.body.address,
      fk_region: req.body.fk_region,
      id: req.params.Id
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
