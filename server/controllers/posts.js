const mongoose = require("mongoose");
const Post = require("../model/posts");

exports.getAllPost = (req, res, next) => {
  Post.find()
    .exec()
    .then(allPosts => {
      const response = {
        count: allPosts.length,
        posts: allPosts.map(post => {
          return {
            id: post._id,
            autorId: post.autorId,
            titulo: post.titulo,
            autor: post.autor,
            imagen: post.imagen,
            categoria: post.categoria,
            fecha: post.fecha,
            texto: post.texto
          };
        })
      };
      if (allPosts.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Array dont has allPosts"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.newPost = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    autorId: req.body.autorId,
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
        message: "Post created with status: 201",
        createdPost: {
          id: result._id,
          autorId: result.autorId,
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
};

exports.deletePost = (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post is Deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

/* GET(Patch) http://localhost:3000/social/edit/postID*/
exports.editPost = (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) return res.json(err);
    // console.log(post);
    // Post.save()
    //   .then(result => {
    //     res.status(201).json({
    //       message: "Post created with status: 201",
    //       createdPost: {
    //         id: result._id,
    //         titulo: result.titulo,
    //         autor: result.autor,
    //         imagen: result.imagen,
    //         categoria: result.categoria,
    //         fecha: result.fecha,
    //         texto: result.texto
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({ error: err });
    //   });
  });
};

exports.postById = (req, res, next) => {
  Post.findById(req.params.postId)
    .exec()
    .then(post => {
      if (!post) {
        return res.status(404).json({
          message: "Post not here"
        });
      }
      res.status(200).json({
        post: post
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.editProduct = (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.update(
    { _id: id },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post is Update fine"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.updatePost = (req, res) => {
  //res.json(req.body);
  Post.findByIdAndUpdate(req.body.id, req.body, (err, post) => {
    if (err) res.json(err);
    res.status(200).json({
      message: "Post is Update fine"
    });
  });
};
