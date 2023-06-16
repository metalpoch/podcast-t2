"""
This module contains routes for sending emails to users who register on the landing page.

Routes:
    /api/sheet/ - the main endpoint for working with google sheet.
"""

from flask import Blueprint

route = Blueprint("sheet", __name__)

from . import routes
