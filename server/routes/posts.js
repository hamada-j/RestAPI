const express = require("express");
const router = express.Router();
const extractFile = require("../middleware/file");
const postsController = require("../controllers/posts");

const PostController = require("../controllers/post");

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

//employee
router.post("/employee/", extractFile, PostController.postSh);
router.put("/employee/:id", extractFile, PostController.putSh);
router.get("", PostController.getSh);
router.get("/employee/:id", PostController.getShId);
router.delete("/employee/:id", PostController.deleteSh);
module.exports = router;
