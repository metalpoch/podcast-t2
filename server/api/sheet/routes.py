from datetime import datetime
from os import environ

import api
import requests
from flask import abort, jsonify, request
from flask_mail import Message
from utils.email import message_template
from utils.validations import validate_json_sheet

from . import route

SHEET_SECRET = environ.get("SHEET_SECRET")
SHEET_PODCAST_URL = environ.get("SHEET_PODCAST_URL", "")

DATE_FORMAT = "%Y-%m-%d"
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
@route.route("/<sheet>")
def index(sheet="podcasts"):
    """
    Handles the index request and returns a JSON response with the data from the specified sheet.

    Parameters
    ----------
    sheet : str, optional
        The name of the sheet to retrieve data from. Can be either "subs" or "podcasts". Defaults to "podcasts".

    Returns
    -------
    str
        A JSON response with the data from the specified sheet or an error message.
    """
    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    if not sheet in ("subs", "podcasts"):
        abort(404)

    url = SHEET_PODCAST_URL + "?sheet=" + sheet
    res = requests.get(url, headers=header)
    return res.json()


@route.route("/", methods=["POST"])
def add_sub():
    """
    Handles the add subscription request and returns a JSON response with the new subscription data.

    Returns
    -------
    str
        A JSON response with the new subscription data or an error message.
    """
    body = request.get_json()

    body = validate_json_sheet(body)
    if body.get("error"):
        res = jsonify(body)
        res.status_code = 422
        return res

    dt_object = datetime.strptime(body["appointment"], DATE_FORMAT)

    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    body["appointment"] = dt_object.strftime("%d/%m/%Y")
    body["subscription"] = datetime.now().strftime("%d/%m/%Y")
    res = requests.post(SHEET_PODCAST_URL, headers=header, json=body)

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
