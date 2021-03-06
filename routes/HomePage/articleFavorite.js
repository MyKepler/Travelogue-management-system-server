var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser"); 
 var URL = require('url');
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
//SQL语句
var  sql = "SELECT * FROM articleFavorite where articleId=?";
var  addsql = "INSERT INTO articleFavorite(articleId,userId) VALUES(?,?)";
var  deletesql = "DELETE FROM articleFavorite where articleId=? and userId=?";
var article = 'SELECT *,article.id,article.createDate FROM (article left join  articleFavorite on articleFavorite.articleId=article.id) left join user on user.id=article.authorId where articleFavorite.userId=? Order By articleFavorite.createDate Desc';

router.post('/', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var SqlParams = params.articleId;
    
    //查
    connection.query(sql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
    });
});

router.post('/addFavorite', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var SqlParams = [params.articleId, params.userId];
    
    //查
    connection.query(addsql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
    });
});

router.post('/removeFavorite', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var SqlParams = [params.articleId, params.userId];
    
    //查
    connection.query(deletesql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
    });
});

router.post('/article', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var SqlParams = params.userId;
    
    //查
    connection.query(article,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var totalNum = result.length
        if(result.length >0) {
            result.forEach(element => {
              let date = new Date(element.createDate)
              const y = date.getFullYear()
              const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
              const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
              const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
              const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
              const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
              var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
              console.log(res, 'xuxy')
              element.createDate = res
            });
          }
        result = result.slice((params.currentPage-1)*params.pageSize,params.currentPage*params.pageSize);
        //把搜索值输出
        res.send({code: 200, message: "success", result, totalNum});
    });
});

module.exports = router;