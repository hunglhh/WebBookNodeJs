const User = require('../models/user');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class userController {

    //[Get] /stored/products
    storedUsers(req, res) {
        User.find({}).then(users => {
            res.render('user/stored-user',
            {users: mutipleMongooseToObject(users)});
        })
    }

    
        //[Get] user/:id/edit
        edit(req, res) {
            User.findById(req.params.id).then(user => {
            res.render('user/edit', {user: mongooseToObject(user)});
            }).catch(err => (console.error(err)));
               
           }
            //[Put] user/:id
        update(req, res) {
            User.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/myuser/stored/user'))
            .catch(err => (console.error(err)))
    }

    //[DELETE] user/:id
        delete(req, res){
            User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(err => (console.error(err)));
        }
}

module.exports = new userController;