from base64 import b64encode
from os import environ

import requests


class Spotify:
    def __init__(self) -> None:
        self.__cliend_id = environ.get("SPOTIFY_CLIENT_ID", "")
        self.__cliend_secret = environ.get("SPOTIFY_CLIENT_SECRET", "")
        self.redirect_uri = environ.get("SPOTIFY_REDIRECT", "")

    def __headers(self) -> dict:
        string_bytes = f"{self.__cliend_id}:{self.__cliend_secret}".encode("utf-8")
        encoded = b64encode(string_bytes).decode()
        return {
            "Authorization": f"Basic {encoded}",
            "Content-Type": "application/x-www-form-urlencoded",
        }

    def __handlerToken(self, body: dict, headers: dict) -> dict:
        response = requests.post(
            "https://accounts.spotify.com/api/token", data=body, headers=headers
        )

        status_code = response.status_code
        if status_code != 200:
            return {"error": response.text, "status_code": status_code}

        return response.json()

    def access_token(self, code: str) -> dict:
        headers = self.__headers()
        body = {
            "code": code,
            "redirect_uri": self.redirect_uri,
            "grant_type": "authorization_code",
        }

        return self.__handlerToken(body, headers)

    def refresh(self, refresh_token: str) -> dict:
        headers = self.__headers()
        body = {"grant_type": "refresh_token", "refresh_token": refresh_token}
        return self.__handlerToken(body, headers)
