from urllib.parse import parse_qs, urlparse

def validate_spotify_state(state:str, url: str):
    """
    Validates the state parameter in a Spotify authorization URL.

    Parameters
    ----------
    state : str
        The state parameter to validate.
    url : str
        The Spotify authorization URL.

    Returns
    -------
    bool
        True if the state parameter is valid, False otherwise.
    """
    parsed_url = urlparse(url)
    state_url = parse_qs(parsed_url.query)["state"][0]
    return True if state == state_url else False

