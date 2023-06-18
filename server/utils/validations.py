import re
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


def is_valid_email(email: str) -> bool:
    """
    Validates if an email address is valid.

    Parameters
    ----------
    email : str
        The email address to validate.

    Returns
    -------
    bool
        True if the email address is valid, False otherwise.
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def is_valid_time(time) -> bool:
    """
    Validates if a time string is valid.

    Parameters
    ----------
    time : str
        The time string to validate.

    Returns
    -------
    bool
        True if the time string is valid, False otherwise.
    """
    pattern = r'^([01]\d|2[0-3]):([0-5]\d)$'
    return re.match(pattern, time) is not None


def validate_json_email(body: dict) -> dict:
    """
    Validates a JSON object containing email data.

    Parameters
    ----------
    body : dict
        The JSON object to validate.

    Returns
    -------
    dict
        A dictionary containing an error message if the validation fails,
        or the validated data if the validation succeeds.
    """
    # Define the fields to validate and their expected data types
    fields = {"client": str, "day": str, "time": str, "recipient": str}
    result = {}

    # Validate each field in the JSON object
    for field, data_type in fields.items():
        data = body.get(field, False)
        if not data:
            return {
                "error": "Unprocessable Entity",
                "message": f"the {field} field is required"
            }
        elif type(data) != data_type:
            return {
                "error": "Unprocessable Entity",
                "message": f"the {field} field was expected to be a {data_type}"
            }

        elif field == "recipient" and not is_valid_email(data):
            return {
                "error": "Unprocessable Entity",
                "message": f"The {field} field was expected to be valid"
            }

        elif field == "time" and not is_valid_time(data):
            return {
                "error": "Unprocessable Entity",
                "message": f"The {field} field was expected to be valid"
            }


        result[field] = data

    return result
