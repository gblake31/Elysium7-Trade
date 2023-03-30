const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ItemSchema = new Schema({
  SellerID: {
    type: String,
    required: true
  },
  ItemName: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Condition: {
    type: String,
    required: true
  },
  Picture: {
    //required: true
  },
  ListedTime: {
    type: Date,
    required: true
  }
});
module.exports = item = mongoose.model("items", ItemSchema);