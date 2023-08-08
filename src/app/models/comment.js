const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');

// mongoose.plugin(slug);
const Comment = new Schema({
  author: String,
  slugProduct: String,
  text: String,
  rating: Number,
},{
  timestamps: true,
});

module.exports = mongoose.model("Comment", Comment);