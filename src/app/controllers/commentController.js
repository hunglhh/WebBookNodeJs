const Comment = require('../models/comment');
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');
class CommentController {




    CommentSubmit(req, res) {
        console.log(req.body)
        const email = req.session.email;
        console.log(email)
        if (!email) {
        res.send('<script>alert("Bạn cần phải đăng nhập để đánh giá !!!");window.location.href = "/login";</script>');

            // res.redirect('/login');
        } else {
            if (req.body.text == "" || req.body.rating == "") {
                res.status(200).json({
                    message: "Khoong dc de trong"
                })
            } else {

                const comment = new Comment({
                    slugProduct: req.body.slug,
                    author: email,
                    text: req.body.text,
                    rating: req.body.star,
                });
                console.log(comment);

                comment.save().then(() => {
                    res.redirect('/' + req.body.slug);
                    // res.status(200).json({
                    //     comment: comment
                    // });
                })
            }

        }
    }
}

module.exports = new CommentController;