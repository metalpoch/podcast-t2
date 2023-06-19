# Documentación Del Endpoint Email

En este archivo README.md se proporcionará una documentación en español para el código proporcionado. El código es un ejemplo de una aplicación Flask que utiliza algunas bibliotecas y funciones para enviar correos electrónicos y realizar validaciones. A continuación, se explicará cada función y su funcionalidad.

### Importaciones

El código comienza con las siguientes importaciones:

```python
from datetime import datetime
import api
from flask import jsonify, request
from flask_mail import Message
from utils.email import message_template
from utils.validations import validate_json_email
```

- `datetime` se utiliza para trabajar con fechas y horas.
- `api` es un módulo personalizado que proporciona funcionalidad relacionada con el API.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web.
- `jsonify` se utiliza para convertir los datos en formato JSON antes de enviarlos como respuesta.
- `request` se utiliza para acceder a los datos de la solicitud HTTP entrante.
- `Message` es una clase de Flask-Mail que se utiliza para crear mensajes de correo electrónico.
- `message_template` es una función personalizada que genera el contenido del correo electrónico a partir de una plantilla.
- `validate_json_email` es una función personalizada que valida los datos JSON en el cuerpo de la solicitud.

### Variables globales

```python
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
```

- `DATE_FORMAT` es una cadena de formato utilizada para analizar la fecha en el formato especificado.
- `LANGS_MAP` es un diccionario que mapea los códigos de idioma a los formatos de fecha correspondientes.

### Ruta `"/"`, método POST

```python
@route.route("/", methods=["POST"])
def index():
    if request.method != "POST":
        response = jsonify({"error": "Method Not Allowed"})
        response.status_code = 405
        return response

    error, client, lang, day, recipient = validate_json_email(request.get_json())

    if error:
        response = jsonify(error)
        response.status_code = 422
        return response

    dt_object = datetime.strptime(day, DATE_FORMAT)
    hour = dt_object.strftime("%H:%M")
    day = dt_object.strftime(LANGS_MAP[lang])

    sms = Message("Cita Podscat-T2 agendada", recipients=[recipient])
    sms.html = message_template(client, lang, day, hour)
    api.mail.send(sms)

    return jsonify({"email": "sended"})
```

Esta ruta maneja las solicitudes a la URL raíz ("/") con el método POST. Si el método HTTP no es POST, se devuelve una respuesta de error con el código de estado 405. Luego, se valida el JSON en el cuerpo de la solicitud utilizando la función `validate_json_email`. Si la validación falla, se devuelve una respuesta de error con el código de estado 422. De lo contrario, se analiza la fecha en el formato especificado utilizando `datetime.strptime` y se formatea la hora y el día según el idioma seleccionado. Luego, se crea un objeto `Message` con los detalles de la cita y se envía utilizando `api.mail.send`. Finalmente, se devuelve una respuesta en formato JSON indicando que el correo electrónico se ha enviado correctamente.

La estructura del objeto JSON es la siguiente:

```json
{
  "client": "Nombre apellido",
  "date": "2023-06-18T20:23:05.368Z",
  "lang": "ja",
  "recipient": "foo@ziman.com"
}
```

- `client` (string, requerido): nombre del cliente que envía el email.
- `date` (string, requerido): fecha y hora de la sesi (formato ISO 8601).
- `lang` (string, requerido): idioma del contenido del email. Solo se permiten los siguientes idiomas: `es`, `en`, `de`, `fr`, `it`, `pt`, `ja`.
- `recipient` (string, requerido): dirección de email del destinatario.
