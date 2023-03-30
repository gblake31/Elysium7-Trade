const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const OrderSchema = new Schema({
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
module.exports = order = mongoose.model("orders", OrderSchema);