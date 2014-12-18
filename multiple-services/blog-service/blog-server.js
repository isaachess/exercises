var koa = require('koa')
var router = require('koa-router')
var r = require('rethinkdb')
var http = require('http')
var socketIo = require('socket.io')
var config = require('../common/config')

var app = koa()
app.use(router(app))

var server = http.Server(app.callback())
var io = socketIo(server)

config.dbConnect()

app.get('/posts/:id', function* (next) {
    var postId = this.params.id
    var s = config.postTable.get(postId)
    this.body = yield config.dbRun(s)
})

io.on('connection', function(socket) {
    console.log('connection made')
    socket.on('getPost', function (postId, cb) {
        var s = config.postTable.get(postId)
        config.dbRun(s).then(function(post) { cb(post) })
    })
})

server.listen(3001)
