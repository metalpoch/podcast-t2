from base64 import b64encode
from urllib.parse import urlencode

import requests

from credentials import (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET,
                         SPOTIFY_REDIRECT)


class Spotify:
    """
    A class to handle authentication and token requests for Spotify's API.

    Attributes
    ----------
    url_auth : str
        The URL for the Spotify authorization endpoint.
    url_token : str
        The URL for the Spotify token endpoint.
    __client_id : str
        The client ID for the Spotify API.
    __client_secret : str
        The client secret for the Spotify API.
    __redirect_url : str
        The redirect URI for the Spotify API.
    scope : str
        The scope of the authorization request.

    Methods
    -------
    url_auth_code_flow(state: str) -> str:
        Returns the URL for the authorization code flow.

    __handlerToken(headers: dict, body: dict) -> dict:
        Handles the token request and returns the response.

    __headers_request_() -> dict:
        Returns the headers for the token request.

    get_token(code: str) -> dict:
        Requests a token using the authorization code.

    refresh_auth(refresh_token: str):
        Requests a new access token using the refresh token.
    """

    def __init__(self) -> None:
        """
        Constructs all the necessary attributes for the Spotify object.
        """
        self.url_auth = "https://accounts.spotify.com/authorize/"
        self.url_token = "https://accounts.spotify.com/api/token/"
        self.__client_id = SPOTIFY_CLIENT_ID
        self.__client_secret = SPOTIFY_CLIENT_SECRET
        self.__redirect_url = SPOTIFY_REDIRECT
        self.scope = "user-read-private user-read-email"

    def url_auth_code_flow(self, state: str):
        """
        Returns the URL for the authorization code flow.

        Parameters
        ----------
        state : str
            A random string to protect against CSRF.

        Returns
        -------
        str
            The URL for the authorization code flow.
        """
        query_params = urlencode(
            {
                "response_type": "code",
                "client_id": self.__client_id,
                "redirect_uri": self.__redirect_url,
                "scope": self.scope,
                "state": state,
            }
        )
        return f"{self.url_auth}?{query_params}"

    def __handlerToken(self, headers: dict, body: dict) -> dict:
        """
        Handles the token request and returns the response.

        Parameters
        ----------
        headers : dict
            The headers for the token request.
        body : dict
            The body for the token request.

        Returns
        -------
        dict
            The response from the token request.
        """
        response = requests.post(self.url_token, data=body, headers=headers)
        status_code = response.status_code
        return response.json() if status_code == 200 else {"status_code": status_code}

    def __headers_request(self) -> dict:
        """
        Returns the headers for the token request.

        Returns
        -------
        dict
            The headers for the token request.
        """
        string_bytes = f"{self.__client_id}:{self.__client_secret}".encode("utf-8")
        encoded = b64encode(string_bytes).decode()
        return {
            "Authorization": f"Basic {encoded}",
            "Content-Type": "application/x-www-form-urlencoded",
        }

    def get_token(self, code: str) -> dict:
        """
        Requests a token using the authorization code.

        Parameters
        ----------
        code : str
            The authorization code returned by the authorization server.

        Returns
        -------
        dict
            The response from the token request.
        """

        headers = self.__headers_request()
        body = {
            "code": code,
            "redirect_uri": self.__redirect_url,
            "grant_type": "authorization_code",
        }

        return self.__handlerToken(headers=headers, body=body)

    def refresh_auth(self, refresh_token: str) -> dict:
        """
        Requests a new access token using the refresh token.

        Parameters
        ----------
        refresh_token : str
            The refresh token returned by the token server.

        Returns
        -------
        dict
            The response from the token request.
        """
        headers = self.__headers_request()
        body = {"grant_type": "refresh_token", "refresh_token": refresh_token}
        return self.__handlerToken(headers=headers, body=body)
