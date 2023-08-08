const productsRouter = require('./products');
const usersRouter = require('./login');
const myBookRouter = require('./myBook');
const userRouter = require('./user');
function route(app) {
    app.use('/myuser', userRouter);
    app.use('/mybook', myBookRouter);
    app.use('/login', usersRouter);
    app.use('/', productsRouter);
    


}


module.exports = route;