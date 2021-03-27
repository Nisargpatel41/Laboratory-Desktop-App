const mongoose = require("mongoose");
const connectDB = async () => {
  console.log("error");
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
