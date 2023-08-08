const User = require("../models/user");
const bcrypt = require('bcrypt');
const {mongooseToObject} = require('../../util/mongoose');

exports.createUser = (req, res, next) => {
  const { fullname, email, password, confirmPassword } = req.body;
  console.log(req.body);
  if (fullname == "" || password == "" || email == "" || confirmPassword == "") {
    res.send('<script>alert("Không được để trống");window.location.href = "/login/register";</script>');

  }else if(password.length < 6){
    res.send('<script>alert("Mật khẩu không được dưới 6 ký tự");window.location.href = "/login/register";</script>');

  }else if(password != confirmPassword){
    // res.status(200).json({ status: false, message: "Không Được Để Trống mk" });
    res.send('<script>alert("Nhập lại mật khẩu không chính xác");window.location.href = "/login/register";</script>');
  } 
  
  else {
    // Mã hóa mật khẩu
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Có lỗi xảy ra trong quá trình mã hóa mật khẩu",
        });
      }
      // lấy dữ liệu
      const users = new User({
        fullname: fullname,
        email,
        password: hash,
        confirmPassword: hash,
      });
      console.log("Register : ", users);
      // lưu vào mogodb
      users
        .save()
        .then((result) => {
          res.send('<script>alert("Đăng ký thành công!");window.location.href = "/login";</script>');
       
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    });
  }
};