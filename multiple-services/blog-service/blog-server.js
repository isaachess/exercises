var koa = require('koa')
var router = require('koa-router')
var r = require('rethinkdb')
var config = require('../common/config')

var app = koa()
app.use(router(app))

config.dbConnect()

app.get('/posts/:id', function* (next) {
    var postId = this.params.id
    var s = config.postTable.get(postId)
    this.body = yield config.dbRun(s)
})

app.listen(3001)
