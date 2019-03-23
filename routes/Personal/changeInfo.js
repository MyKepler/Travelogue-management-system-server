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
var  sql = 'SELECT * FROM user where id=?';
var  infoSql = "UPDATE user set account=?,gender=?,city=?,motto=? where id=?";
var  telSql = "UPDATE user set telephone=? where id=?";
var  passwordSql = "UPDATE user set password=? where id=?";

router.post('/', function(req, res, next) {
  var params = URL.parse(req.url, true).query;
  // var sqlByIdParams = params.id;
  var sqlByIdParams=req.body.id;  
  // var password=req.body.password;  
  //查
  connection.query(sql,sqlByIdParams,function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    res.send({code: 200, message: "success", result});
  });
});

router.post('/info', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var SqlParams = [params.account, params.gender, params.city, params.motto, params.id];
    //查
    connection.query(infoSql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
    });
});
router.post('/tel', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = [params.telephone, params.id];
  //查
  connection.query(telSql,SqlParams,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send({code: 200, message: "success", result});
  });
});
router.post('/password', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = [params.password, params.id];
  //查
  connection.query(passwordSql,SqlParams,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send({code: 200, message: "success", result});
  });
});

module.exports = router;