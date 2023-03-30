const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Login: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  OrderedList: {
    type: [String],
    required: true
  },
  ListedList: {
    type: [String],
    required: true
  },
  FavoritedList: {
    type: [String],
    required: true
  }
});
module.exports = user = mongoose.model("users", UserSchema);