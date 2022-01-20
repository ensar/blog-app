const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

module.exports = mongoose.model("user", UserSchema);
