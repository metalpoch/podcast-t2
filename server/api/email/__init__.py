"""
This module contains routes for sending emails to users who register on the landing page.

Routes:
    /api/email/ - the main endpoint for sending emails.
"""
from flask import Blueprint

route = Blueprint("email", __name__)

from . import routes
