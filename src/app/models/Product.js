const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Product = new Schema({
    name: { type: String, maxLength: 255},
    description: { type: String, maxLength: 1000},
    image: { type: String, maxLength: 100000},
    author: { type: String, maxLength: 255},
    videoId: { type: String, maxLength:1000},
    slug: { type: String, slug: 'name'},

},{
    timestamps: true,
});

module.exports = mongoose.model('Product', Product)