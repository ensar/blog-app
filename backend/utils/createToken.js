const jwt = require("jsonwebtoken");

const createToken = (user) => {
  if (!user) {
    return false;
  }
  return jwt.sign(
    { id: user.id, name: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1w" }
  );
};

module.exports = createToken;
