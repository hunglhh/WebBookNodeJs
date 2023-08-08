const Product = require('../models/Product');
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');
const Comment = require('../models/comment');
class ProductController {

    //[Get] / 

    index(req, res) {
        Product.find({}).then(products => {
            res.render('home', {
                products: mutipleMongooseToObject(products)
            });
        }).catch(err => {
            console.error(err);
        })
        // Course.find({}).then(courses => {
        //     res.render('home',
        //     {products : mutipleMongooseToObject(products)});
        // })
    }

    //[Get] /:slug

    show = async (req, res) => {
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug: slug
        });
        const comments = await Comment.find({
            slugProduct: slug, // Bình luận theo slug của sản phẩm
        });
        res.render('products/show', {
            product: mongooseToObject(product),
            comments: mutipleMongooseToObject(comments),
        });
    }
    //[Get] /create
    create(req, res) {
        res.render('products/create')
    }
    //[Post] /store
    store(req, res) {
        const formData = req.body;
        // formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const product = new Product(formData);
        product.save().then(() => {
                res.redirect('mybook/stored/products')
            })
            .catch(err => (console.error(err)));
    }

    //[Get] /:id/edit
    edit(req, res) {
        Product.findById(req.params.id).then(product => {
            res.render('products/edit', {
                product: mongooseToObject(product)
            });
        }).catch(err => (console.error(err)));

    }
    //[Put] /:id
    update(req, res) {
        Product.updateOne({
                _id: req.params.id
            }, req.body)
            .then(() => res.redirect('mybook/stored/products'))
            .catch(err => (console.error(err)))
    }

    //[DELETE]/:id
    delete(req, res) {
        Product.deleteOne({
                _id: req.params.id
            })
            .then(() => res.redirect('back'))
            .catch(err => (console.error(err)));
    }
 //[Get] /search
    search(req, res){
        const searchQuery = req.query.q;
        //sử dụng biểu thức chính quy $regex
        Product.find({ name: {$regex: searchQuery, $options: 'i' }}).then(products => {
    
            res.render('products/search', {products:mutipleMongooseToObject(products)})
        }).catch(err => (console.error(err)));

    }
}

module.exports = new ProductController;