"""
This module contains a Flask route to connect to the Spotify API and get the audios of some podcasts.

Rutas:
    /api/spotify/auth - the route to login to the Spotify API.
    /api/spotify/auth/callback - this route receive the response from Spotify API with the token.
    /api/spotify/auth/refresh - this route update the access token based on the refresh token.

"""
from flask import Blueprint

route = Blueprint("spotify", __name__)

from . import routes
