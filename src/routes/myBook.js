const express = require('express');
const router = express.Router();

const myBookController = require('../app/controllers/myBookController');
router.get('/stored/products', myBookController.storedProducts);

module.exports = router;