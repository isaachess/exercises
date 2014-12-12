var koa = require('koa')
var router = require('koa-router')
var request = require('request')
var q = require('q')
var config = require('../common/config')

var app = koa()
app.use(router(app))

config.dbConnect()

app.get('/posts/:id', function* (next) {
    var postId = this.params.id
    this.body = yield getPost(postId)
})

app.listen(3000)

function getPost(id) {
    var d = q.defer()
    request.get('http://localhost:3001/posts/' + id, function(e, r, body) {
        d.resolve(body)
    })
    return d.promise
}
