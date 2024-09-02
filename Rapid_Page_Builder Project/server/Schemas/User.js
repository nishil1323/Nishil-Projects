const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required : true,
    unique : true
  },
  password: {
    type : mongoose.SchemaTypes.String,
    required : true
  },
});

module.exports = mongoose.model("User", UserSchema);
