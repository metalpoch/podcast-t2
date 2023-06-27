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


def handler_spreadsheets_error(field: str, data: str):
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
    map_var = {
        "client": "Nombre y Apellido",
        "appointment": "Fecha",
        "email": "Email",
        "language": "Idioma"
    }

    if not data:
        return {
            "error": "Unprocessable Entity",
            "message": f"El campo {map_var[field]} es requerido.",
        }

    elif type(data) != str:
        return {
            "error": "Unprocessable Entity",
            "message": f"El campo escrito en {map_var[field]} no es valido.",
        }

    elif field == "client" and len(data) < 4:
        return {
            "error": "Unprocessable Entity",
            "message": f"El nombre ingresado no es valido.",
        }

    elif field == "language" and data not in language:
        return {
            "error": "Unprocessable Entity",
            "message": f"El idioma seleccionado no se encuentra en entre los siguientes: {', '.join(language)}.",
        }

    elif field == "email" and not is_valid_email(data):
        return {
            "error": "Unprocessable Entity",
            "message": f"El email ingresado no es válido.",
        }


def validate_json_sheet(body: dict) -> dict:
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
    for field in ("client", "email", "language"):
        data = body.get(field, "")
        error = handler_spreadsheets_error(field, data)
        if error:
            return error

    return body
