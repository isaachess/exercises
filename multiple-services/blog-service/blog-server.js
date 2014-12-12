var express = require('express')
var r = require('rethinkdb')
var config = require('../common/config')

var app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3001)
