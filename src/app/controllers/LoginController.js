const User = require("../models/user");
const bcrypt = require('bcrypt');
const {
  mongooseToObject
} = require('../../util/mongoose');

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; // nhận dữ liệu từ form
  if (email == "" || password == "") {
    // kiểm tra form có để trống hay không
    res.send('<script>alert("Không được để trống");window.location.href = "/login";</script>');
  } else {
    // nếu không để trống thì vô này

    // User.find({}).then((users) => {
    //     res.json(users);
    // })
    User.findOne({
        email: req.body.email
      }) // kiểm tra bảng mogodb có email nào trùng với email đã nhận từ form không
      .then((users) => {
        if (!users) {
          return res.redirect('/login/error');
          // return res.status(200).json({
          //   status: false,
          //   message: "Tài khoản không tồn tại",
          // });
        }
        // đúng thì so sánh mật khẩu register có trùng với mật khẩu nhận từ form hay không
        bcrypt.compare(password, users.password, (err, result) => {
          if (err) {

            return res
              .status(401)
              .json({
                status: false,
                message: "Đăng nhập thất bại"
              });
          }
          //   nếu đúng thì
          if (result) {
            req.session.loggedin = true;
            req.session.email = email;

            res.locals.email = email; // lưu trữ email đã đăng nhập và truyền vào một biến locals

            console.log(res.locals.email);

            return res.send(`<script>alert("Xin Chao ${users.fullname}!");window.location.href = "/";</script>`);

          } else {
            return res.send('<script>alert("Mật khẩu bạn nhập không đúng!");window.location.href = "/login";</script>');
          }
        });
      })
      //   thất bại
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};