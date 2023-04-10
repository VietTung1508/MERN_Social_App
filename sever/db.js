const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/social_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
