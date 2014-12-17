var koa = require('koa')
var router = require('koa-router')
var request = require('request')
var q = require('q')
var config = require('../common/config')

var app = koa()
app.use(router(app))

app.get('/posts/:id', function* (next) {
    var postId = this.params.id
    var post = yield getPost(postId)
    var comments = yield getComments(postId)
    post.comments = comments
    this.body = post
})

app.listen(3000)

function getPost(id) {
    var d = q.defer()
    request.get('http://localhost:3001/posts/' + id, function(e, r, body) {
        d.resolve(JSON.parse(body))
    })
    return d.promise
}

function getComments(id) {
    var d = q.defer()
    request.get('http://localhost:3002/comments/' + id, function(e, r, body) {
        d.resolve(JSON.parse(body))
    })
    return d.promise
}
