import secrets

from flask import jsonify, redirect, request

from utils.spotify import Spotify
from utils.validations import validate_spotify_state

from . import route

spotify = Spotify()


@route.route("/auth")
def auth():
    """
    Handles the Spotify authorization URL and redirects the user to the authorization URL.

    Returns
    -------
    str
        A redirect response to the authorization URL or a JSON response with an error message.
    """
    state = secrets.token_hex(120)
    url = spotify.url_auth_code_flow(state)
    if validate_spotify_state(state, url):
        return redirect(url)
    else:
        return jsonify({"error": "state_mismatch"})


@route.route("/auth/callback")
def spotify_callback():
    """
    Handles the Spotify callback URL and returns a JSON response with the access token.

    Returns
    -------
    str
        A JSON response with the access token.
    """
    error = request.args.get("error")
    code = str(request.args.get("code"))

    if error:
        return jsonify({"error": error})

    response = spotify.get_token(code)

    return jsonify(response)


@route.route("/auth/refresh")
def refresh_auth():
    """
    Handles the refresh token request and returns a JSON response with the new access token.

    Returns
    -------
    str
        A JSON response with the new access token or an error message.
    """
    refresh_token = str(request.args.get("token"))
    if not refresh_token:
        return jsonify({"error": "refresh_token empty"})

    response = spotify.refresh_auth(refresh_token=refresh_token)

    return jsonify(response)
