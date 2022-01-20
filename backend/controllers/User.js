const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

const signup = async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then((response) => res.status(201).send(response))
    .catch(() =>
      res.status(400).send({ error: "Kaydolurken bir sorun oluştu." })
    );
};

const login = async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then((response) => {
      if (!response) {
        return res
          .status(500)
          .send({ error: "Böyle bir kullanıcı bulunamadı." });
      }
      if (bcrypt.compareSync(req.body.password, response.password)) {
        const token = createToken(response);
        const { password, ...info } = response.toObject();
        return res.status(200).send({ ...info, token });
      } else {
        return res.status(400).send({ error: "Şifreyi yanlış girdiniz." });
      }
    })
    .catch(() =>
      res.status(500).send({ error: "Oturum açarken bir sorun oluştu." })
    );
};

module.exports = {
  signup,
  login,
};
