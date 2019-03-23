
// 加载 express
const express = require('express')
// 加载 socket.io
const socketIo = require('socket.io')
// 加载 http
const http = require('http')
// 创建 app
const app = express()
// 创建 server
const server = http.createServer(app)
// 创建 sokcet
const io = socketIo(server)
// 保存用户
const users = []
// 当客户端连接时
io.on('connection', socket => {
  console.log('client is connect')
  // 注册登录事件
  socket.on('login', users => {
    console.log(users)
    // 发布登录成功事件 并发送消息
    socket.emit('loginSucess', '登录成功')
  })
})