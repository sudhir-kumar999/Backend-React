const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      
    },

    password: {
      type: String,
      required: true,
      
    },
  }
);

module.exports = mongoose.model("User", userSchema);
