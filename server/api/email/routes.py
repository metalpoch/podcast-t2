from flask import jsonify

from . import route


@route.route("/")
def index():
    return jsonify({"email": "index"})
