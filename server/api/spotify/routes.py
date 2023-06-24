import json

from flask import jsonify, request

from utils.spotify import Spotify

from . import route

spotify = Spotify()


@route.route("/auth/", methods=["POST"])
def auth():
    data = json.loads(request.data)
    code = data.get("code")

    response = spotify.access_token(code)
    if response.get("error"):
        res = jsonify(response["error"])
        res.status_code = response["status_code"]

    res = {
        "access_token": response["access_token"],
        "refresh_token": response["refresh_token"],
    }

    return jsonify(res)


@route.route("/auth/refresh")
def refresh():
    refresh_token = str(request.args.get("token"))

    response = spotify.refresh(refresh_token)

    if response.get("error"):
        res = jsonify(response["error"])
        res.status_code = response["status_code"]

    res = {
        "access_token": response["access_token"],
    }

    return jsonify(res)
