const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  image: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: String,
      username: String,
      commented_at: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("post", PostSchema);
