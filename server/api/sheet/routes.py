from datetime import datetime

import requests
from flask import jsonify, request
from flask_mail import Message

import api
from credentials import SHEET_SECRET, SHEET_URL
from utils.email import message_template
from utils.validations import validate_json_sheet

from . import route

DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"
LANGS_MAP = {
    "es": "%d/%m/%Y",
    "en": "%m/%d/%Y",
    "de": "%d.%m.%Y",
    "fr": "%d/%m/%Y",
    "it": "%d/%m/%Y",
    "pt": "%d/%m/%Y",
    "ja": "%Y/%m/%d",
}


@route.route("/")
def index():
    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    res = requests.get(SHEET_URL, headers=header)
    return res.json()


@route.route("/", methods=["POST"])
def add():
    body = request.get_json()

    error = validate_json_sheet(body)
    if error:
        res = jsonify(error)
        res.status_code = 422
        return res

    dt_object = datetime.strptime(body["appointment"], DATE_FORMAT)

    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    body["appointment"] = dt_object.strftime("%d/%m/%Y %H:%M:%S")
    body["subscription"] = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    res = requests.post(SHEET_URL, headers=header, json=body)

    # Create a Message object with the appointment details and send it using Flask-Mail
    sms = Message("Cita Podscat-T2 agendada", recipients=[body["email"]])
    sms.html = message_template(
        client=body["client"],
        lang=body["language"],
        day=dt_object.strftime(LANGS_MAP[body["language"]]),
        hour=dt_object.strftime("%H:%M"),
    )
    api.mail.send(sms)

    return res.json()
