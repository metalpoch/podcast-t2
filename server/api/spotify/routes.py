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
    print(response)
    if response.get("error"):
        return jsonify(response["error"]), response["status_code"]

    return jsonify(
        {
            "access_token": response["access_token"],
            "refresh_token": response["refresh_token"],
        }
    )


@route.route("/auth/refresh")
def refresh():
    refresh_token = str(request.args.get("token"))

    response = spotify.refresh(refresh_token)

    if response.get("error"):
        return jsonify(response["error"]), response["status_code"]

    return jsonify(
        {
            "access_token": response["access_token"],
        }
    )

