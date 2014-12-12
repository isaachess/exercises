var r = require('rethinkdb')
var q = require('q')

var dbOptions = {
    host: 'localhost',
    port: 28015,
    db: 'multiple'
}

var connection;

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
            cursor.toArray(function(err, results) {
                if (err) rethinkError(err)
                else d.resolve(results)
            })
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
