var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const MongoStore = require("connect-mongo")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ArticleRouter = require("./routes/article")
var commentRouter = require("./routes/comments")
var tagRouter = require("./routes/tag");
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 导入连接数据库
require('./utils/connent')

// 配置session中间件
app.use(session({
  secret: 'hxw',      // 密钥，通过什么来加密你的数据
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 360000*30         // 设置过期时间
  },
  rolling: true,           // 每次请求都会刷新时间
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost/myblog"    // 将session保存在数据库中
  })

}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/article", ArticleRouter);
app.use("/comment", commentRouter);
app.use("/tag", tagRouter);
app.use("/category", categoryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
