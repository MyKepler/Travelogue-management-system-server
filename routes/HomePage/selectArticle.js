var express = require('express');
var router = express.Router();
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
var sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id';
var sqlById = "SELECT * FROM article left join user on article.authorId=user.id where article.id=?";
var sqlById2 = "SELECT * FROM article where authorId=?";
var sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id Order By createDate Desc';
var sqlCondition = "SELECT * FROM article where source=? and destination=? and tripMember=? and tripDay=? and tripPay=? and";

// 选择所有文章
router.get('/', function(req, res, next) {
    connection.query(sql,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      //把搜索值输出
      res.send(result);
    });

});
// 根据文章id选择文章
router.get('/searchByArticleId', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    var sqlByIdParams = params.id;
    console.log(params, sqlByIdParams,133)
      connection.query(sqlById,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send(result);
      });
});
// 根据作者id选择文章
router.get('/searchByUserId', function(req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  var sqlByIdParams = params.authorId;
    connection.query(sqlById2,sqlByIdParams,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      //把搜索值输出
      res.send(result);
    });

});
// 根据时间排序所有文章
router.get('/searchByTime', function(req, res, next) {
  connection.query(sqlTime,function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    //把搜索值输出
    res.send(result);
  });

});
// 根据出发地、目的地、人数、天数、费用选择文章
router.get('/searchByCondition', function(req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  var sqlByConditionParams = [params.source,params.destination,params.tripMember,params.tripDay,params.tripPay];
    connection.query(sqlCondition,sqlByConditionParams,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      //把搜索值输出
      res.send(result);
    });

});


module.exports = router;