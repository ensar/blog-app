const Post = require("../models/Post");

const getPosts = (req, res) => {
  return Post.find()
    .sort({ created_at: -1 })
    .populate({ path: "user", select: "username" })
    .then((response) => res.status(200).send(response))
    .catch((err) =>
      res
        .status(500)
        .send({ error: "Blog postlar getirilirken bir sorun oluşu." })
    );
};

const createPost = (req, res) => {
  req.body.user = req.user.id;
  const post = new Post(req.body);
  return post
    .save()
    .then((response) => res.status(201).send(response))
    .catch((err) =>
      res.status(500).send({ error: "Post oluşturulurken bir sorun oluştu." })
    );
};

const findPost = (req, res) => {
  return Post.findById({ _id: req.params.id })
    .populate({ path: "user", select: "username" })
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(404).send({ error: "Blog bulunamadı." }));
};

const updatePost = (req, res) => {
  return Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send({ error: err.message }));
};

const deletePost = (req, res) => {
  return Post.findOneAndDelete({ _id: req.params.id })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send({ error: err.message }));
};

const addComment = (req, res) => {
  return Post.findById(req.params.id)
    .then((post) => {
      const comment = { ...req.body, username: req.user.name };
      post.comments?.push(comment);
      post
        .save()
        .then((newPost) => res.status(201).send(newPost))
        .catch((err) => res.status(500).send({ error: err }));
    })
    .catch((err) => res.status(500).send({ error: "Yorum oluşturulamadı." }));
};

const deleteComment = (req, res) => {
  return Post.findById(req.params.id)
    .then((post) => {
      post.comments = post.comments.filter(
        (p) => String(p._id) !== req.params.commentId
      );
      post
        .save()
        .then((updatedPost) => res.status(200).send(updatedPost))
        .catch(() => res.status(500).send({ error: "Yorum silinemedi." }));
    })
    .catch(() =>
      res
        .status(500)
        .send({ error: "Yorum silme işlemi sırasında bir sorun oluştu." })
    );
};

module.exports = {
  getPosts,
  createPost,
  findPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};
