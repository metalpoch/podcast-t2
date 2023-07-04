# Documentación Del Endpoint Sheet

## Dependencias
```python
import json
from datetime import datetime
from os import environ

import api
import requests
from flask import abort, jsonify, request
from flask_mail import Message
from utils.email import message_template
from utils.validations import validate_json_sheet

from . import route
```

- `route` es un objeto Blueprint que registra las rutas de la aplicación.
- `environ` se utiliza para obtener las variables de entorno que contienen el secreto y la URL de la hoja de cálculo de Google.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web y manejar las solicitudes HTTP.
- `requests` se utiliza para hacer peticiones HTTP a la API de Google Sheets.
- `json` se utiliza para convertir los datos de la solicitud en un diccionario de Python.
- `datetime` se utiliza para manejar las fechas y los formatos.
- `Message` se utiliza para crear un mensaje con los detalles de la cita y enviarlo usando Flask-Mail.

## Rutas

### Ruta `"/"` o `"/<sheet>"`

```python
@route.route("/")
@route.route("/<sheet>")
def index(sheet="podcasts"):
    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    if not sheet in ("subs", "podcasts"):
        abort(404)

    url = SHEET_PODCAST_URL + "?sheet=" + sheet
    res = requests.get(url, headers=header)
    return res.json()
```

Esta ruta devuelve una respuesta JSON con los datos de la hoja de cálculo de Google. Se obtiene el parámetro sheet de la ruta, que puede ser "subs" o "podcasts". Si no es ninguno de esos, se devuelve un error 404. Se construye la URL de la hoja de cálculo con el parámetro sheet y se hace una petición GET con el header de autorización. Se devuelve la respuesta JSON.

### Ruta `"/"` (método POST)

```python
@route.route("/", methods=["POST"])
def add_sub():
    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    res = requests.get(SHEET_PODCAST_URL, headers=header)
    appointments = [d["appointment"] for d in json.loads(res.text)]

    body = request.get_json()
    body = validate_json_sheet(body)

    if body.get("error"):
        res = jsonify(body)
        res.status_code = 422
        return res

    elif body.get("appointment") in appointments:
        res = jsonify(
            {
                "error": "Unprocessable Entity",
                "message": f"Lo sentimos, la fecha que solicitaste ya está ocupada por alguien más.",
            }
        )
        res.status_code = 422
        return res

    try:
        dt_object = datetime.strptime(body["appointment"], DATE_FORMAT)
    except ValueError:
        res = jsonify(
            {
                "error": "Unprocessable Entity",
                "message": f"Lo sentimos, la fecha que solicitaste no es valida.",
            }
        )
        res.status_code = 422
        return res

    body["appointment"] = dt_object.strftime("%Y-%m-%d")
    body["subscription"] = datetime.now().strftime("%Y-%m-%d")
    res = requests.post(SHEET_PODCAST_URL, headers=header, json=body)

    # Create a Message object with the appointment details and send it using Flask-Mail
    sms = Message("Cita Podscat-T2 agendada", recipients=[body["email"]])
    sms.html = message_template(
        client=body["client"],
        lang=body["language"],
        day=dt_object.strftime(LANGS_MAP[body["language"]]),
    )
    api.mail.send(sms)

    return res.json()
```

Esta ruta maneja una solicitud POST a la raíz de la aplicación. Se obtiene el cuerpo de la solicitud en formato JSON utilizando `request.get_json()`. Luego, se valida el JSON utilizando la función `validate_json_sheet()` del módulo `utils.validations`. Si hay algún error de validación, se devuelve una respuesta de error en formato JSON con el código de estado 422.

La estructura del objeto JSON es la siguiente:

```json
{
  "client": "Nombre apellido",
  "appointment": "YYYY-MM-DD",
  "language": "ja",
  "email": "foo@ziman.com"
}
```

- `client` (string, requerido): nombre del cliente que envía el email.
- `appointment` (string, requerido): fecha de la sesión.
- `language` (string, requerido): idioma del contenido del email. Solo se permiten los siguientes idiomas: `es`, `en`, `de`, `fr`, `it`, `pt`, `ja`.
- `email` (string, requerido): dirección de email del destinatario.

Después de la validación, se convierte la cadena de fecha y hora en un objeto `datetime` utilizando la función `strptime()` de la clase `datetime`. Luego, se actualiza el valor de "appointment" en el cuerpo del JSON con la fecha y hora formateadas correctamente utilizando `strftime()`. También se agrega un campo "subscription" con la fecha y hora actual.

A continuación, se realiza una solicitud POST a la URL de la hoja de cálculo utilizando el encabezado de autorización y el cuerpo del JSON actualizado.

Finalmente, se crea un objeto `Message` con los detalles de la cita y se envía utilizando `Flask-Mail`. El cuerpo del mensaje se genera utilizando la plantilla `message_template()` del módulo `utils.email`. El correo electrónico se envía al destinatario especificado en el campo "email" del JSON.
