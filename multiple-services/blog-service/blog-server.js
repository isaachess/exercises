var express = require('express')
var r = require('rethinkdb')
var config = require('../common/config')

var app = express()

app.get('/posts/:id', function (req, res) {
    res.send('Hello World from the blog server!')
})

app.listen(3001)
