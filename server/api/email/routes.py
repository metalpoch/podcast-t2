from datetime import datetime
import api
from flask import jsonify, request
from flask_mail import Message
from utils.email import message_template
from utils.validations import validate_json_email

from . import route

DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"
LANGS_MAP = {
    "es": "%d/%m/%Y",
    "en": "%m/%d/%Y",
    "de": "%d.%m.%Y",
    "fr": "%d/%m/%Y",
    "it": "%d/%m/%Y",
    "pt": "%d/%m/%Y",
    "ja": "%Y/%m/%d"
}

@route.route("/", methods=["POST"])
def index():
    """
    Handles requests to the root URL ("/").

    Returns
    -------
    JSON response
        A JSON response indicating whether the email was sent successfully or an error occurred.
    """
    # Validate the JSON data in the request body
    error, client, lang, day, recipient = validate_json_email(request.get_json())

    # If the validation fails, return an error response
    if error:
        response = jsonify(error)
        response.status_code = 422
        return response
    
    dt_object = datetime.strptime(day, DATE_FORMAT)
    hour = dt_object.strftime("%H:%M")
    day = dt_object.strftime(LANGS_MAP[lang])

    # Create a Message object with the appointment details and send it using Flask-Mail
    sms = Message("Cita Podscat-T2 agendada", recipients=[recipient])
    sms.html = message_template(client, lang, day, hour)
    api.mail.send(sms)

    return jsonify({"email": "sended"})
