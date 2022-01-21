const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const db = require("./db");
const PostRoute = require("./routes/PostRoute");
const UserRoute = require("./routes/UserRoute");

const app = express();
db();
app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json({ limit: 1024 * 1024 * 10 }));
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use("/posts", PostRoute);
app.use("/user", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running at 5000");
});
