import api
from flask import jsonify, request
from flask_mail import Message
from utils.email import message_template
from utils.validations import validate_json_email

from . import route


@route.route("/", methods=["GET", "POST"])
def index():
    """
    Handles requests to the root URL ("/").

    Returns
    -------
    JSON response
        A JSON response indicating whether the email was sent successfully or an error occurred.
    """
    # If the HTTP method is not POST, return an error response
    if request.method != "POST":
        response = jsonify({"error": "Method Not Allowed"})
        response.status_code = 405
        return response

    # Validate the JSON data in the request body
    body = validate_json_email(body=request.get_json())

    # If the validation fails, return an error response
    if body.get("error"):
        response = jsonify(body)
        response.status_code = 422
        return response

    # Create a Message object with the appointment details and send it using Flask-Mail
    sms = Message("Cita Podscat-T2 agendada", recipients=[body["recipient"]])
    sms.html = message_template(body["client"], body["day"], body["time"])
    api.mail.send(sms)

    return jsonify({"email": "sended"})
