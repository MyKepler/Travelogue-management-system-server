var express = require('express');
var router = express.Router();
 var URL = require('url');
 var bodyParser = require("body-parser"); 
//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '123456',
database : 'travelogue_system'
});
//执行创建连接 
connection.connect();
var sql = 'select newtable.id,newtable.title,newtable.createDate,newtable.comment,user.account from (SELECT article.id,article.title,commenterId,articleComment.createDate,comment  FROM article left join articleComment on article.id=articleComment.articleId where authorId=?)as newtable  left join user on  user.id= newtable.commenterId Order By createDate Desc';
var sqllike = 'select newtable.id,newtable.title,newtable.createDate,user.account from (SELECT article.id,article.title,userId,articleLike.createDate  FROM article left join articleLike on article.id=articleLike.articleId where authorId=?)as newtable  left join user on  user.id= newtable.userId Order By createDate Desc';
// 根据文章id选择文章
router.post('/', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var sqlByIdParams = params.id;
      connection.query(sql,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
      });
});

router.post('/like', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var sqlByIdParams = params.id;
      connection.query(sqllike,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
      });
});
module.exports = router;