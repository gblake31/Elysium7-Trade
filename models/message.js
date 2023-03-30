const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const MessageSchema = new Schema({
  BuyerID: {
    type: String,
    required: true
  },
  SellerID: {
    type: String,
    required: true
  },
  ItemID: {
    type: String,
    required: true
  }
});
module.exports = message = mongoose.model("messages", MessageSchema);