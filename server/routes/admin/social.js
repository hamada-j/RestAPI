const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../model/posts");
const register = require("../../controllers/register");

/* GET http://localhost:3000/admin/social/ */
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
      res.render("social", { layout: "admin_layout", message: response });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/* POST http://localhost:3000/social/*/
router.post("/", (req, res, next) => {
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
          res.render("social", { layout: "admin_layout", message: response });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/* POST http://localhost:3000/social/delete/postID*/
router.get("/delete/:postId", (req, res, next) => {
  const id = req.params.postId;
  console.log(id);
  Post.remove({ _id: id })
    .exec()
    .then(result => {
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
          res.render("social", { layout: "admin_layout", message: response });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
