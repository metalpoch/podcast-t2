from os import environ

from flask import Flask
from flask_mail import Mail

from api.sheet import route as sheet
from api.spotify import route as spotify

app = Flask(__name__)

app.secret_key = environ.get("SECRET_KEY")
app.config["MAIL_SERVER"] = environ.get("MAIL_SERVER")
app.config["MAIL_PORT"] = environ.get("MAIL_PORT")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = environ.get("MAIL_USERNAME")

mail = Mail(app)

app.register_blueprint(spotify, url_prefix="/api/spotify")
app.register_blueprint(sheet, url_prefix="/api/sheet")
