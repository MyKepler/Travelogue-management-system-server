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
var  deleteSql = "DELETE FROM article where id=?";

router.get('/', function(req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  var SqlParams = params.id;
  
  connection.query(deleteSql,SqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
    return;
    }
    else {
      res.send('success');
    }
  });
});

module.exports = router;