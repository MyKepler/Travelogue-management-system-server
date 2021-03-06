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
var  sql = "SELECT * FROM articleLike where articleId=?";
var  addsql = "INSERT INTO articleLike(articleId,userId) VALUES(?,?)";
var deletesql = "DELETE FROM articleLike where articleId=? and userId=?";

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

router.post('/addLike', function(req, res, next) {
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

router.post('/removeLike', function(req, res, next) {
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
module.exports = router;