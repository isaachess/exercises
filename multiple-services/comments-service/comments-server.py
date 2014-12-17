from flask import Flask
import rethinkdb as r
import json

conn = r.connect(
    host = 'localhost',
    port = 28015,
    db = 'multiple'
)

app = Flask(__name__)

@app.route('/comments/<postId>')
def get_comments(postId):
    comments = r.table('comments').filter({"postId": postId}).coerce_to('array').run(conn)
    comments_json = json.JSONEncoder().encode(comments)
    return comments_json

if __name__ == '__main__':
    app.run(port=3002)
