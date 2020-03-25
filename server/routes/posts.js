const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

///// GET from MongoDB-Atlas Clusters /////
router.get("/", postsController.getAllPost);
/////  POST In MongoDB-Atlas Clusters /////
router.post("/", postsController.newPost);
/////  DELETE Product from MongoDB-Atlas Clusters /////
router.delete("/delete/:postId", postsController.deletePost);

module.exports = router;
