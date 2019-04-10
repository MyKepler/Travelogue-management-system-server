var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/AI', function(req, res) {
  //解析请求参数
  console.log('req', req.body);
  axios.get("http://111.231.92.206:3000/api/chat/AI", { params: { ...req.body, city:'未知', userId:777 } }).then(resData => {
    console.log(resData.data.results);
    res.send(JSON.stringify(resData.data));
  }).catch((e) => {console.log('err', e)});
});
module.exports = router;