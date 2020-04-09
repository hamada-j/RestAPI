const PostEmploye = require("../model/post");

exports.postSh = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new PostEmploye({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Sh added",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Not Save Sh" });
    });
};

exports.putSh = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new PostEmploye({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update Sh" });
      } else {
        res.status(401).json({ message: "Not Auth" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Not Updated" });
    });
};

exports.getSh = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = PostEmploye.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return PostEmploye.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Sh fetched",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Not Sh" });
    });
};

exports.getShId = (req, res, next) => {
  PostEmploye.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Sh not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Sh Not Found" });
    });
};

exports.deleteSh = (req, res, next) => {
  PostEmploye.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Delete" });
      } else {
        res.status(401).json({ message: "Not auth" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Not Delete Sh" });
    });
};
