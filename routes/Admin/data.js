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
//SQL语句
var sql = 'SELECT count(*) as num FROM article group by category';
var sql2 = 'SELECT count(*) as num FROM user group by gender';

// 查询文章分类
router.post('/', function(req, res, next) {
  //解析请求参数
    connection.query(sql,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      //把搜索值输出
      res.send({code: 200, message: "success", result});
    });
});

router.post('/gender', function(req, res, next) {
    //解析请求参数
      connection.query(sql2,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        //把搜索值输出
        res.send({code: 200, message: "success", result});
      });
  });
module.exports = router;