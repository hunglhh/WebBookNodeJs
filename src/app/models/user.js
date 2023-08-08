const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');

// mongoose.plugin(slug);

const User = new Schema(
    {
      fullname: {
        type: String,
        required: true,
      // để đảm bảo rằng các tên người dùng không trùng lặp
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("User", User);