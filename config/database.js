const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");
// Make sure that for local testing use the following:
//   const db = "mongodb://localhost/Jobby";

const connectToMongo = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to mongo...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
