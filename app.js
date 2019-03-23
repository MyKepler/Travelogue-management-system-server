var createError = require('http-errors');
var express = require('express');//加载express模块
var path = require('path');//路径模块
var cookieParser = require('cookie-parser');//解析Cookie的工具,通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var logger = require('morgan');//在控制台中，显示req请求的信息

// 路由信息（接口地址），存放在routes的根目录
var selectArticle = require('./routes/HomePage/selectArticle');
var sendArticle = require('./routes/HomePage/sendArticle');
var comment = require('./routes/HomePage/comment');
var deleteArticle = require('./routes/HomePage/deleteArticle')
var login = require('./routes/base/login');
var register = require('./routes/base/register');
var changeInfo = require('./routes/Personal/changeInfo');
var follow = require('./routes/Personal/follow');
var upload = require('./routes/Personal/upload');
var articleLike = require('./routes/HomePage/articleLike');
var articleFavorite = require('./routes/HomePage/articleFavorite');
var articleAdmin = require('./routes/Admin/article');
var userAdmin = require('./routes/Admin/user');
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
app.use('/selectArticle',selectArticle);
app.use('/sendArticle',sendArticle);
app.use('/comment',comment);
app.use('/login',login);
app.use('/register',register);
app.use('/changeInfo',changeInfo);
app.use('/follow',follow);
app.use('/deleteArticle',deleteArticle);
app.use('/upload',upload);
app.use('/articleLike',articleLike);
app.use('/articleFavorite',articleFavorite);
app.use('/articleAdmin',articleAdmin);
app.use('/userAdmin',userAdmin);

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
