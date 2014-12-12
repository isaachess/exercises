var express = require('express')
var config = require('../common/config')

var app = express()

config.dbConnect()

app.get('/posts/:id', function (req, res) {
    var postId = req.params.id
    res.send(postId)
})

app.listen(3000)
