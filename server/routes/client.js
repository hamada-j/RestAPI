const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client");

///// POST SIGNUP for Client In MongoDB-Atlas Clusters /////
router.post("/signup", clientController.signupClient);
///// POST  LOGIN for Client  MongoDB-Atlas Clusters /////
router.post("/login", clientController.loginClient);
///// DELETE CLIENT for Client  MongoDB-Atlas Clusters /////
router.delete("/:clientId", clientController.deleteClient);

module.exports = router;
