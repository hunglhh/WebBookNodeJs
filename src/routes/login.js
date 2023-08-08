const express = require('express');
const { loginUser } = require("../app/controllers/LoginController");
const { createUser } = require("../app/controllers/RegisterController");
const router = express.Router();
const user = require("../app/models/user");

router.post("/postRegister", createUser);
router.get('/register', (req, res, next) => {
    res.render('user/register')
});
router.get('/error', (req, res, next) => {
  res.render('user/error');
});
router.post("/postLogin", loginUser);
router.get("/", (req, res, next) => {
    res.render("user/login");
  });

module.exports = router;