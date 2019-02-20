var createError = require('http-errors');
var express = require('express');//加载express模块
var path = require('path');//路径模块
var cookieParser = require('cookie-parser');//解析Cookie的工具,通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var logger = require('morgan');//在控制台中，显示req请求的信息

// 路由信息（接口地址），存放在routes的根目录
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var add = require('./routes/add');
// var edit = require('./routes/edit');
// var del = require('./routes/del');

var app = express();

// 模板开始
app.set('views', path.join(__dirname, 'views'));//设置视图根目录
app.set('view engine', 'jade');//设置视图格式

// 载入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置路由，（'自定义路径'，上面设置的接口地址）
app.use('/', indexRouter);
app.use('/users', usersRouter);//查
app.use('/add', add);//增
// app.use('/edit', edit);//改
// app.use('/del', del);//删

// 错误处理
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
