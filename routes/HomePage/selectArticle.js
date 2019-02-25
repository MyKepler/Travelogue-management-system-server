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
var  sql = 'SELECT * FROM article left join user on article.authorId=user.id';
var  sqlById = "SELECT * FROM article left join user on article.authorId=user.id where article.id=?";

router.get('/', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    var sqlByIdParams = params.id;
    console.log(params, sqlByIdParams,133)
    if(sqlByIdParams) {
      connection.query(sqlById,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send(result);
      });
    }
    else{
      connection.query(sql,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        //把搜索值输出
        res.send(result);
      });
    }

});

module.exports = router;