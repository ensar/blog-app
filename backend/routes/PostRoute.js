const Post = require("../models/Post");
const {
  createPost,
  getPosts,
  findPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
} = require("../controllers/Post");
const router = require("express").Router();
const verifyUser = require("../middlewares/verifyUser");

router.get("/", verifyUser, getPosts);
router.post("/", verifyUser, createPost);
router.get("/:id", verifyUser, findPost);
router.patch("/:id", verifyUser, updatePost);
router.delete("/:id", verifyUser, deletePost);
router.post("/:id/add-comment", verifyUser, addComment);
router.delete("/:id/:commentId", verifyUser, deleteComment);

module.exports = router;
