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
const multer = require("multer");
const verifyUser = require("../middlewares/verifyUser");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", verifyUser, getPosts);
router.post("/", verifyUser, upload.single("postImage"), createPost);
router.get("/:id", verifyUser, findPost);
router.patch("/:id", verifyUser, upload.single("postImage"), updatePost);
router.delete("/:id", verifyUser, deletePost);
router.post("/:id/add-comment", verifyUser, addComment);
router.delete("/:id/:commentId", verifyUser, deleteComment);

module.exports = router;
