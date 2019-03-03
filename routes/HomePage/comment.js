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
var  sql = "SELECT * FROM articlecomment left join user on articlecomment.commenterId=user.id where articleId=?";

router.get('/', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
      var SqlParams = params.articleId;
    
    //查
    connection.query(sql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(params.articleId);
        
        //把搜索值输出
       res.send(result);
    });
});

module.exports = router;