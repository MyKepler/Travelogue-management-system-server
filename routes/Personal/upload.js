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
var  sql = "UPDATE user set avator=? where id=?";

var fs = require('fs');
var multer  = require('multer');
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'public/upload');    
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名
    cb(null, Date.now() + "-" + file.originalname);  
  }
});

// 创建文件夹
var createFolder = function(folder){
  try{
    // 检测文件是否存在
    fs.accessSync(folder); 
  }catch(e){
    // 文件夹不存在，以同步的方式创建文件目录
    fs.mkdirSync(folder);
  }  
};

var uploadFolder = 'E:/FinalWork/Travelogue-management-system-server/public/upload/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });
router.post('/', upload.single('file'), function(req, res, next) {
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  // 接收文件成功后返回数据给前端
  res.json({code: 200, path: file.path});
});

router.post('/img', function(req, res, next) {
  //解析请求参数
  var params = req.body;
  var SqlParams = [params.avator, params.id];
  //查
  connection.query(sql,SqlParams,function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    res.send({code: 200, message: "success", result});
  });
});

// 导出模块（在 app.js 中引入）
module.exports = router;
