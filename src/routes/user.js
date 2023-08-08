const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');
router.put('/user/:id', userController.update);
router.get('/user/:id/edit', userController.edit);
router.delete('/user/:id', userController.delete);
router.get('/stored/user', userController.storedUsers);

module.exports = router;