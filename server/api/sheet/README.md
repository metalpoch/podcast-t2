# Documentación Del Endpoint Sheet

En este archivo README.md se proporcionará una documentación en español para el script proporcionado. El script es un ejemplo de una aplicación Flask que maneja solicitudes HTTP para obtener y agregar datos a una hoja de cálculo. A continuación, se explicará cada función y su funcionalidad.

### Importaciones

El script comienza con las siguientes importaciones:

```python
from datetime import datetime
from os import environ

from flask import jsonify, request
from flask_mail import Message
import requests

import api
from utils.email import message_template
from utils.validations import validate_json_sheet
```

- `datetime` se utiliza para trabajar con fechas y horas en Python.
- `environ` se utiliza para obtener las variables de entorno.
- `requests` se utiliza para realizar solicitudes HTTP a la hoja de cálculo.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web y manejar las solicitudes HTTP.
- `flask_mail` se utiliza para enviar correos electrónicos utilizando Flask.
- `api` es un módulo personalizado que contiene funciones y configuraciones específicas de la aplicación.
- `utils.email` es un módulo personalizado que contiene funciones relacionadas con el envío de correos electrónicos.
- `utils.validations` es un módulo personalizado que contiene funciones relacionadas con la validación de datos.

### Ruta `"/"`

```python
@route.route("/")
def index():
    header = {"Authorization": f"Bearer {SHEET_SECRET}"}
    res = requests.get(SHEET_URL, headers=header)
    return res.json()
```

Esta ruta maneja una solicitud GET a la raíz de la aplicación. Se obtiene la hoja de cálculo utilizando una solicitud GET a la URL de la hoja de cálculo con el encabezado de autorización. Finalmente, se devuelve la respuesta en formato JSON.

### Ruta `"/"`, métodos `["POST"]`

```python
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

    # Crear un objeto Message con los detalles de la cita y enviarlo usando Flask-Mail
    sms = Message("Cita Podscat-T2 agendada", recipients=[body["email"]])
    sms.html = message_template(
        client=body["client"],
        lang=body["language"],
        day=dt_object.strftime(LANGS_MAP[body["language"]]),
        hour=dt_object.strftime("%H:%M"),
    )
    api.mail.send(sms)

    return res.json()
```

Esta ruta maneja una solicitud POST a la raíz de la aplicación. Se obtiene el cuerpo de la solicitud en formato JSON utilizando `request.get_json()`. Luego, se valida el JSON utilizando la función `validate_json_sheet()` del módulo `utils.validations`. Si hay algún error de validación, se devuelve una respuesta de error en formato JSON con el código de estado 422.

La estructura del objeto JSON es la siguiente:

```json
{
  "client": "Nombre apellido",
  "appointment": "2023-06-18T20:23:05.368Z",
  "language": "ja",
  "email": "foo@ziman.com"
}
```

- `client` (string, requerido): nombre del cliente que envía el email.
- `appointment` (string, requerido): fecha y hora de la sesión (formato ISO 8601).
- `language` (string, requerido): idioma del contenido del email. Solo se permiten los siguientes idiomas: `es`, `en`, `de`, `fr`, `it`, `pt`, `ja`.
- `email` (string, requerido): dirección de email del destinatario.

Después de la validación, se convierte la cadena de fecha y hora en un objeto `datetime` utilizando la función `strptime()` de la clase `datetime`. Luego, se actualiza el valor de "appointment" en el cuerpo del JSON con la fecha y hora formateadas correctamente utilizando `strftime()`. También se agrega un campo "subscription" con la fecha y hora actual.

A continuación, se realiza una solicitud POST a la URL de la hoja de cálculo utilizando el encabezado de autorización y el cuerpo del JSON actualizado.

Finalmente, se crea un objeto `Message` con los detalles de la cita y se envía utilizando `Flask-Mail`. El cuerpo del mensaje se genera utilizando la plantilla `message_template()` del módulo `utils.email`. El correo electrónico se envía al destinatario especificado en el campo "email" del JSON.
