from flask import Flask

app = Flask(__name__)

from api.spotify import route as spotify
from api.email import route as email
from api.sheet import route as sheet

app.register_blueprint(spotify, url_prefix="/api/spotify")
app.register_blueprint(email, url_prefix="/api/email")
app.register_blueprint(sheet, url_prefix="/api/sheet")
