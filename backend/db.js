const mongoose = require("mongoose");
const db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.de6nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectDb = async () => {
  await mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connected"))
    .catch((error) => console.log(error));
};

module.exports = () => {
  connectDb();
};
