import secrets

from flask import Flask, jsonify, redirect, request

from credentials import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT
from utils.spotify import Spotify
from utils.validations import validate_spotify_state

app = Flask(__name__)

@app.route("/api")
def index():
    """
    Returns a JSON response indicating that the application is alive.

    Returns
    -------
    str
        A JSON response indicating that the application is alive.
    """
    return jsonify({"isAlive": True})


@app.route("/api/spotify/auth")
def auth():
    """
    Handles the Spotify authorization URL and redirects the user to the authorization URL.

    Returns
    -------
    str
        A redirect response to the authorization URL or a JSON response with an error message.
    """
    state = secrets.token_hex(120)
    spotify = Spotify(
        client_id=SPOTIFY_CLIENT_ID,
        redirect_uri=SPOTIFY_REDIRECT
    )
    url = spotify.url_auth_code_flow(state)
    if validate_spotify_state(state, url):
        return redirect(url)
    else:
        return jsonify({"error": "state_mismatch"})


@app.route("/api/spotify/callback")
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

    spotify = Spotify(
        client_id=SPOTIFY_CLIENT_ID,
        redirect_uri=SPOTIFY_REDIRECT
    )

    response = spotify.get_token(
        code=code, client_secret=SPOTIFY_CLIENT_SECRET
    )

    return jsonify(response)


@app.route("/api/spotify/refresh")
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

    spotify = Spotify(
        client_id=SPOTIFY_CLIENT_ID,
        redirect_uri=SPOTIFY_REDIRECT
    )

    response = spotify.refresh_auth(
        refresh_token=refresh_token, client_secret=SPOTIFY_CLIENT_SECRET
    )

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
