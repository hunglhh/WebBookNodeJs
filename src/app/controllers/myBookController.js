const Product = require('../models/Product');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class myBookController {

    //[Get] /stored/products
    storedProducts(req, res) {
        Product.find({}).then(products => {
            res.render('mybook/stored-products',
            {products: mutipleMongooseToObject(products)});
        })
    }
}

module.exports = new myBookController;