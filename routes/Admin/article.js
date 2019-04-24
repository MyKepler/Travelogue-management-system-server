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
var sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id';
var sqlById = "SELECT *,article.id FROM article left join user on article.authorId=user.id where article.id=?";
var  deleteSql = "DELETE FROM article where id=?";
var  reviewSql = "UPDATE article set review=? where id=?";

// 选择所有文章
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
// 根据文章id选择文章
router.post('/detail', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var sqlByIdParams = params.id;
      connection.query(sqlById,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
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
        res.send({code: 200, message: "success", result});
      });
});
// 根据文章id删除文章
router.post('/delete', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = params.id;
  
  connection.query(deleteSql,SqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
    return;
    }
    else {
      res.send({code: 200, message: "success", result});
    }
  });
});
// 文章审核
router.post('/review', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = [params.review,params.id];
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