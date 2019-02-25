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
var  sql = 'SELECT * FROM user where telephone=?';
var  addSql = "INSERT INTO user(telephone,password) VALUES(?,?)";

router.get('/', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    var SqlParams = [params.telephone];
    var SqlAddParams = [params.telephone, params.password];
      
      //增
    // connection.query(addSql,addSqlParams,function (err, result) {
    //     if(err){
    //      console.log('[INSERT ERROR] - ',err.message);
    //      return;
    //     }             
    // });
    
    //查
    connection.query(sql,SqlParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result,'xuxu')
        //把搜索值输出
        if(result.length == 0){
            connection.query(addSql,SqlAddParams,function (err, result) {
                if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
                }
                else {
                    res.send('success');
                }             
            });
            }
        else {
            res.send('fail');
        }
       
    });
});

module.exports = router;