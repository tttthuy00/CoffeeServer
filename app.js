var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// khai báo route
// import model
require('./components/user/UserModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// api
const userAPIRouter = require('./routes/api/userAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// http://localhost:3003/
// hiển thị
app.use('/api/userAPI', userAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// kết nối mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thuuya:Thuyne09.@coffeev1.oci2ij9.mongodb.net/?retryWrites=true&w=majority&appName=coffeev1', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>>>> MongoDB Connected!!!!'))
  .catch(err => console.log('>>>>>>>>>>>>> Connect Error: ', err));
// const mongodb = "mongodb+srv://loandatn:Loanho25042003@coffee.fkgxbc0.mongodb.net//";
// mongoose.connect(mongodb, {
// })
//   .then(() => {
//     console.log(">>>>>>>>>> MongoDB Connnected!!!!!!!");
//   })
//   .catch(err => {
//     console.log("Connect Error!", err);
//   });



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
