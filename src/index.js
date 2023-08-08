const path = require('path');
const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const port = 3000;
const session = require('express-session');
const route = require('./routes');
const db = require('./config/db');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
//Connect to db

app.use(session({
      secret: "mysecretkey", // chuỗi bí mật được sử dụng để mã hóa session ID trước khi lưu trữ trong cookie.
      resave: false,// nếu true, session sẽ được lưu lại trên máy chủ mỗi khi có yêu cầu kết thúc, ngay cả khi session không bị thay đổi.
      saveUninitialized: true,//nếu true, session sẽ được lưu trữ trên máy chủ mặc dù chưa có yêu cầu được tạo ra cho session.
      cookie: { maxAge: 24 * 60 * 60 * 1000 },//định cấu hình các tùy chọn cookie cho session, trong đó maxAge là thời gian sống tối đa của cookie (tính bằng mili giây).
    })
  );
  
app.use(function (req, res, next) {
    res.locals.loggedin = req.session.loggedin;
    res.locals.email = req.session.email;
    next();
  });
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//     express.urlencoded({
//         extended: true,
//     }),
// );
// app.use(express.json());
app.use(methodOverride('_method'));

handlebars.registerHelper("stars", function (rating) {
  const fullStars = Math.floor(rating);//àm tròn xuống cho số nguyên gần nhất
  const halfStar = rating - fullStars >= 0.5;//lưu trữ giá trị true nếu số điểm đánh giá có phần thập phân lớn hơn hoặc bằng 0,5; ngược lại, halfStar là false.
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);//tính toán số lượng sao trống cần phải hiển thị dựa trên số lượng sao đã đánh giá. 
  const stars = [];// lưu trữ các chuỗi class của từng icon sao.

  for (let i = 0; i < fullStars; i++) {
    stars.push("fas fa-star");
  }

  if (halfStar) {
    stars.push("fas fa-star-half-alt");
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push("far fa-star");
  }

  return stars;
});

const stars = [
  "fas fa-star",
  "fas fa-star",
  "fas fa-star",
  "fas fa-star-half-alt",
  "far fa-star",
];
handlebars.registerHelper(helpers);
app.engine('handlebars', hbs.engine({
    helpers: {
        sum: (a, b) => a + b,
        times: (n, block) => {
          let accum = '';
          for(let i = 0; i < n; ++i) {
              accum += block.fn(i);
          }
          return accum;
      }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources\\views'));
// app.get('/', (req, res)=>{
//     res.render('home')
// } )
route(app);

app.listen(port, () => console.log(`http://localhost:${port}`));
