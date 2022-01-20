const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Token bulunamadı." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, doc) => {
    if (err) {
      return res.status(400).send({ error: "Token doğrulanamadı." });
    }
    req.user = doc;
    next();
  });
};

module.exports = verifyUser;
