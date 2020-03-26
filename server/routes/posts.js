const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

///// GET from MongoDB-Atlas Clusters /////
router.get("/", postsController.getAllPost);
/////  POST In MongoDB-Atlas Clusters /////
router.post("/", postsController.newPost);
/////  DELETE Post from MongoDB-Atlas Clusters /////
router.delete("/delete/:postId", postsController.deletePost);
///// GET/Id from MongoDB-Atlas Clusters /////
router.get("/:postId", postsController.postById);
/////  PATCH edit a Post In MongoDB-Atlas Clusters /////
router.patch("/edit/:postId", postsController.editPost);
router.post("/update", postsController.updatePost);
module.exports = router;
