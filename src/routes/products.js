const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const commentController = require('../app/controllers/commentController');
router.get('/search', productController.search);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.post('/store', productController.store)
router.get('/create', productController.create);
router.get('/:slug', productController.show);
router.post('/commentsubmit', commentController.CommentSubmit);
router.get('/', productController.index);

module.exports = router;