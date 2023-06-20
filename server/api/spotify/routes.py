import secrets

from flask import jsonify, redirect, request, session

from utils.spotify import Spotify

from . import route

spotify = Spotify()


@route.route("/auth/")
def auth():
    """
    Handles the Spotify authorization URL and redirects the user to the authorization URL.

    Returns
    -------
    str
        A redirect response to the authorization URL or a JSON response with an error message.
    """
    session["state"] = state = secrets.token_hex(120)
    url = spotify.url_auth_code_flow(state)
    return redirect(url)


@route.route("/auth/callback/")
def spotify_callback():
    """
    Handles the Spotify callback URL and returns a JSON response with the access token.

    Returns
    -------
    str
        A JSON response with the access token.
    """
    error = request.args.get("error")
    state = str(request.args.get("state"))
    code = str(request.args.get("code"))

    if error:
        response = jsonify({"error": error})
        response.status_code = 400
        return response
    elif state != session["state"]:
        response = jsonify({"error": "state_mismatch"})
        response.status_code = 400
        return response

    response = spotify.get_token(code)

    return jsonify(response)


@route.route("/auth/refresh/")
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
