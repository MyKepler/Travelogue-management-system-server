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
var sql = 'SELECT * FROM userfollowrelation where followId=? and beFollowedId=?'
var  sqlfollowed = 'SELECT * FROM userfollowrelation left join user on followId=user.id where userfollowrelation.beFollowedId=?';
var  sqlfollow = 'SELECT * FROM userfollowrelation left join user on beFollowedId=user.id where userfollowrelation.followId=?';
var  addSql = "INSERT INTO userfollowrelation(followId,beFollowedId) VALUES(?,?)";
var  removeSql = "DELETE from userfollowrelation where followId=? and beFollowedId=?";

// 查询关注记录
router.post('/', function(req, res, next) {
    var params = req.body;
    var sqlByIdParams = [params.followId, params.beFollowedId];
    connection.query(sql,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
      });
  });

// 查询粉丝
router.post('/myfans', function(req, res, next) {
  var params = req.body;
  var sqlByIdParams = params.beFollowedId;
  //查
  connection.query(sqlfollowed,sqlByIdParams,function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    res.send({code: 200, message: "success", result});
  });
});

// 查询关注
router.post('/myfollow', function(req, res, next) {
    var params = req.body;
    var sqlByIdParams = params.followId;
    //查
    connection.query(sqlfollow,sqlByIdParams,function (err, result) {
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send({code: 200, message: "success", result});
    });
  });

// 添加关注
router.post('/addfollow', function(req, res, next) {
    var params = req.body
    var sqlByIdParams = [params.followId, params.beFollowedId];
    connection.query(sql,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if(result.length != 0) {
            res.send("存在用户");
            return;
        } else {
            //添加
            connection.query(addSql,sqlByIdParams,function (err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            res.send({code: 200, message: "success", result});
            });
        }
      });

  });

// 取消关注
router.post('/removefollow', function(req, res, next) {
    var params = req.body;
    var sqlByIdParams = [params.followId, params.beFollowedId];
    connection.query(sql,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if(result.length == 0) {
            res.send("不存在相关记录");
            return;
        } else {
            //添加
            connection.query(removeSql,sqlByIdParams,function (err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            res.send({code: 200, message: "success", result});
            });
        }
      });

  });

module.exports = router;