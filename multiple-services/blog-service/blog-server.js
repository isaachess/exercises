var koa = require('koa')
var router = require('koa-router')
var r = require('rethinkdb')
var config = require('../common/config')

var app = koa()
app.use(router(app))

app.get('/posts/:id', function* (next) {
    this.body = 'Hello World from the blog server!'
})

app.listen(3001)
