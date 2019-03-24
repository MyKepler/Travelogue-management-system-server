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
// var sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id';
var sqlById = "SELECT *,article.id FROM article left join user on article.authorId=user.id where article.id=?";
var sqlById2 = "SELECT * FROM article where authorId=? and review=1";
// var sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id Order By createDate Desc';
// var sqlCondition = "SELECT * FROM article where source=? and destination=? and tripMember=? and tripDay=? and tripPay=?";

// 选择所有文章
router.post('/', function(req, res, next) {
    var params = req.body;
    var sql;
    if (params.category == 1) {
      sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=1 and review=1';
    } else if (params.category == 2) {
      sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=2 and review=1';
    } else if (params.category == 3) {
      sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=3 and review=1';
    } else {
      sql = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where review=1';
    }
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
router.post('/searchByArticleId', function(req, res, next) {
    //解析请求参数
    var params = req.body;
    var sqlByIdParams = params.id;
      connection.query(sqlById,sqlByIdParams,function (err, result) {
        if(err) {
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.send({code: 200, message: "success", result});
      });
});
// 根据作者id选择文章
router.post('/searchByUserId', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var sqlByIdParams = params.authorId;
    connection.query(sqlById2,sqlByIdParams,function (err, result) {
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
// 根据时间排序所有文章
router.post('/searchByTime', function(req, res, next) {
  var params = req.body;
  var sqlTime;
  if (params.category == 1) {
    sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=1 and review=1 Order By createDate Desc';
  } else if (params.category == 2) {
    sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=2 and review=1 Order By createDate Desc';
  } else if (params.category == 3) {
    sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where category=3 and review=1 Order By createDate Desc';
  } else {
    sqlTime = 'SELECT *,article.id FROM article left join user on article.authorId=user.id where review=1 Order By createDate Desc';
  }
  connection.query(sqlTime,function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    //把搜索值输出
    var totalNum = result.length
    result = result.slice((params.currentPage-1)*params.pageSize,params.currentPage*params.pageSize);
    //把搜索值输出
    res.send({code: 200, message: "success", result, totalNum});
  });

});
// 根据出发地、目的地、人数、天数、费用选择文章
router.post('/searchByCondition', function(req, res, next) {
  //解析请求参数
  var params  = req.body;
  var sqlCondition;
  if (params.category == 1) {
    if (params.source) {
      sqlCondition = "SELECT * FROM article where source like '%"+ params.source +"%' and category=1 and review=1";
      // sqlByConditionParams = params.source;
    } else if (params.destination) {
      sqlCondition = "SELECT * FROM article where destination like '%"+ params.destination +"%' and category=1 and review=1";
      // sqlByConditionParams = params.destination;
    } else if (params.tripMember) {
      sqlCondition = "SELECT * FROM article where tripMember like '%"+ params.tripMember +"%' and category=1 and review=1";
      // sqlByConditionParams = params.tripMember;
    } else if (params.tripDay) {
      sqlCondition = "SELECT * FROM article where tripDay like '%"+ params.tripDay +"%' and category=1 and review=1";
      // sqlByConditionParams = params.tripDay;
    } else if (params.tripPay) {
      sqlCondition = "SELECT * FROM article where tripPay like '%"+ params.tripPay +"%' and category=1 and review=1";
      // sqlByConditionParams = params.tripPay;
    }    
  } else if (params.category == 2) {
    if (params.source) {
      sqlCondition = "SELECT * FROM article where source like '%"+ params.source +"%' and category=2 and review=1";
      // sqlByConditionParams = params.source;
    } else if (params.destination) {
      sqlCondition = "SELECT * FROM article where destination like '%"+ params.destination +"%' and category=2 and review=1";
      // sqlByConditionParams = params.destination;
    } else if (params.tripMember) {
      sqlCondition = "SELECT * FROM article where tripMember like '%"+ params.tripMember +"%' and category=2 and review=1";
      // sqlByConditionParams = params.tripMember;
    } else if (params.tripDay) {
      sqlCondition = "SELECT * FROM article where tripDay like '%"+ params.tripDay +"%' and category=2 and review=1";
      // sqlByConditionParams = params.tripDay;
    } else if (params.tripPay) {
      sqlCondition = "SELECT * FROM article where tripPay like '%"+ params.tripPay +"%' and category=2 and review=1";
      // sqlByConditionParams = params.tripPay;
    } 
  } else if (params.category == 3) {
    if (params.source) {
      sqlCondition = "SELECT * FROM article where source like '%"+ params.source +"%' and category=3 and review=1";
      // sqlByConditionParams = params.source;
    } else if (params.destination) {
      sqlCondition = "SELECT * FROM article where destination like '%"+ params.destination +"%' and category=3 and review=1";
      // sqlByConditionParams = params.destination;
    } else if (params.tripMember) {
      sqlCondition = "SELECT * FROM article where tripMember like '%"+ params.tripMember +"%' and category=3 and review=1";
      // sqlByConditionParams = params.tripMember;
    } else if (params.tripDay) {
      sqlCondition = "SELECT * FROM article where tripDay like '%"+ params.tripDay +"%' and category=3 and review=1";
      // sqlByConditionParams = params.tripDay;
    } else if (params.tripPay) {
      sqlCondition = "SELECT * FROM article where tripPay like '%"+ params.tripPay +"%' and category=3 and review=1";
      // sqlByConditionParams = params.tripPay;
    } 
  } else {
    if (params.source) {
      sqlCondition = "SELECT * FROM article where source like '%"+ params.source +"%' and review=1";
      // sqlByConditionParams = params.source;
    } else if (params.destination) {
      sqlCondition = "SELECT * FROM article where destination like '%"+ params.destination +"%' and review=1";
      // sqlByConditionParams = params.destination;
    } else if (params.tripMember) {
      sqlCondition = "SELECT * FROM article where tripMember like '%"+ params.tripMember +"%' and review=1";
      // sqlByConditionParams = params.tripMember;
    } else if (params.tripDay) {
      sqlCondition = "SELECT * FROM article where tripDay like '%"+ params.tripDay +"%' and review=1";
      // sqlByConditionParams = params.tripDay;
    } else if (params.tripPay) {
      sqlCondition = "SELECT * FROM article where tripPay like '%"+ params.tripPay +"%' and review=1";
      // sqlByConditionParams = params.tripPay;
    } 
  }

    connection.query(sqlCondition,function (err, result) {
      console.log(sqlCondition)
      if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      //把搜索值输出
      res.send({code: 200, message: "success", result});
    });

});


module.exports = router;