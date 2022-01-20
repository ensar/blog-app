const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./db");
const PostRoute = require("./routes/PostRoute");
const UserRoute = require("./routes/UserRoute");

const app = express();
db();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/posts", PostRoute);
app.use("/user", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running at 5000");
});
