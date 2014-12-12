var r = require('rethinkdb')
var q = require('q')

var dbOptions = {
    host: 'localhost',
    port: 28015,
    db: 'multiple'
}

var connection;
var postTable = r.table('posts')
var commentTable = r.table('comments')

function dbConnect() {
    var d = q.defer()
    r.connect(dbOptions, function(err, conn) {
        if (err) d.reject(err)
        else {
            connection = conn
            d.resolve(conn)
        }
    })
    return d.promise
}

function dbRun(sequence) {
    var d = q.defer()
    sequence.run(connection, function(err, cursor) {
        if (err) rethinkError(err)
        else {
            if (cursor && cursor.toArray) {
                cursor.toArray(function(err, results) {
                    if (err) rethinkError(err)
                    else d.resolve(results)
                })
            }
            else d.resolve(cursor)
        }
    })
    return d.promise
}

function rethinkError(error) {
    console.log('rethink error', error)
}

exports.dbOptions = dbOptions;
exports.dbRun = dbRun;
exports.dbConnect =dbConnect;
exports.postTable = postTable;
exports.commentTable = commentTable;
