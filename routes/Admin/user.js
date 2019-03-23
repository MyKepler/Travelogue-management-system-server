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
var sql = 'SELECT * FROM user';
var  reviewSql = "UPDATE user set state=? where id=?";

// 选择所有用户
router.post('/', function(req, res, next) {
  //解析请求参数
  var params = req.body;
    connection.query(sql,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      var totalNum = result.length
      result = result.slice((params.currentPage-1)*params.pageSize,params.currentPage*params.pageSize);
      //把搜索值输出
      res.send({code: 200, message: "success", result, totalNum});
    });
});

// 用户禁用
router.post('/review', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = [params.state,params.id];
  console.log(SqlParams)
  connection.query(reviewSql,SqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
    else {
      res.send({code: 200, message: "success", result});
    }
  });
});


module.exports = router;