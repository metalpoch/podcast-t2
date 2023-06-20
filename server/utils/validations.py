import re


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
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None


def is_valid_date(date: str):
    """
    Validates if a date string is valid.

    Parameters
    ----------
    date : str
        The date string to validate.

    Returns
    -------
    bool
        True if the date string is valid, False otherwise.
    """
    pattern = r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z"
    return re.fullmatch(pattern, date) is not None


def handler_spreadsheets_error(field: str, data: str | None):
    """
    Handles errors related to spreadsheets data.

    Parameters
    ----------
    field : str
        The name of the field being validated.
    data : str or None
        The value of the field being validated.

    Returns
    -------
    dict
        A dictionary containing an error message if the validation fails,
        or None if the validation succeeds.
    """
    language = ("es", "en", "de", "fr", "it", "pt", "ja")

    if not data:
        return {
            "error": "Unprocessable Entity",
            "message": f"The {field} field is required",
        }

    elif type(data) != str:
        return {
            "error": "Unprocessable Entity",
            "message": f"The {field} field was expected to be a string",
        }

    elif field == "language" and data not in language:
        return {
            "error": "Unprocessable Entity",
            "message": f"The {field} field not is in {language}",
        }

    elif field == "email" and not is_valid_email(data):
        return {
            "error": "Unprocessable Entity",
            "message": f"The {field} field was expected to be valid",
        }

    elif field == "appointment" and not is_valid_date(data):
        return {
            "error": "Unprocessable Entity",
            "message": f"The {field} field was expected to be valid",
        }


def validate_json_sheet(body: dict) -> dict | None:
    """
    Validates a JSON object containing spreadsheets data.

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
    # Validate each field in the JSON object
    fields = ("client", "email", "language", "appointment")
    for field in fields:
        data = body.get(field)
        error = handler_spreadsheets_error(field, data)
        if error:
            return error
