const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../model/posts");

// GET Method
router.get("/", (req, res, next) => {
  Post.find()
    .exec()
    .then(allPosts => {
      const response = {
        count: allPosts.length,
        posts: allPosts.map(post => {
          return {
            id: post._id,
            titulo: post.titulo,
            autor: post.autor,
            imagen: post.imagen,
            categoria: post.categoria,
            fecha: post.fecha,
            texto: post.texto
          };
        })
      };
      // if (allProducts.length >= 0) {
      res.status(200).json(response);
      // } else {
      //   res.status(404).json({
      //     message: "Array dont has products"
      //   });
      // }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// POST Method
router.post(
  "/",

  (req, res, next) => {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      titulo: req.body.titulo,
      autor: req.body.autor,
      imagen: req.body.imagen,
      categoria: req.body.categoria,
      fecha: req.body.fecha,
      texto: req.body.texto
    });
    post
      .save()
      .then(result => {
        res.status(201).json({
          message: "Product created with status: 201",
          createdPost: {
            id: result._id,
            titulo: result.titulo,
            autor: result.autor,
            imagen: result.imagen,
            categoria: result.categoria,
            fecha: result.fecha,
            texto: result.texto
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

module.exports = router;
