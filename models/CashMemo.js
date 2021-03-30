const mongoose = require("mongoose");

const CashMemoSchema = new mongoose.Schema({
  registerNumber: {
    type: Number,
    required: true,
  },
  memoDate: {
    type: Date,
    required: true,
  },
  receivedFrom: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  investigations: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("CashMemo", CashMemoSchema);
