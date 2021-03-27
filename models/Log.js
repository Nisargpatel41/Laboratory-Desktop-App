const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Log text is required"],
  },
});

module.exports = mongoose.model("Log", LogSchema);
