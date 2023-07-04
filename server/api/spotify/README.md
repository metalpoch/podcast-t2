# Documentación Del Endpoint Spotify

## Dependencias
```python
import json

from flask import jsonify, request
from utils.spotify import Spotify

from . import route
```
- `json` se utiliza para convertir los datos de la solicitud en un diccionario de Python.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web y manejar las solicitudes HTTP.
- `utils.spotify` es un módulo personalizado que contiene una clase Spotify que encapsula las funciones relacionadas con la API de Spotify.
- `route` es un objeto Blueprint que registra las rutas de la aplicación.

## Instancia de Spotify

```python
spotify = Spotify()
```

Se crea una instancia de la clase Spotify, que se utilizará para interactuar con la API de Spotify.

## Rutas

### Ruta `"/auth/"`

```python
@route.route("/auth/", methods=["POST"])
def auth():
    data = json.loads(request.data)
    code = data.get("code")

    response = spotify.access_token(code)
    if response.get("error"):
        return jsonify(response["error"]), response["status_code"]

    return jsonify(
        {
            "access_token": response["access_token"],
            "refresh_token": response["refresh_token"],
        }
    )
```

Esta ruta maneja la solicitud de obtener el token de acceso y devuelve una respuesta JSON con el token de acceso y el token de refresco. Se obtienen los datos de la solicitud y se extrae el código. Se obtiene el token de acceso utilizando el método `access_token` de la instancia de Spotify. Si hay algún error, se devuelve una respuesta con código 400 y el mensaje de error. Si no hay ningún problema, se devuelve una respuesta JSON con el token de acceso y el token de refresco.

### Ruta `"/auth/refresh"`

```python
@route.route("/auth/refresh")
def refresh():
    refresh_token = str(request.args.get("token"))

    response = spotify.refresh(refresh_token)

    if response.get("error"):
        return jsonify(response["error"]), response["status_code"]

    return jsonify(
        {
            "access_token": response["access_token"],
        }
    )
```

Esta ruta maneja la solicitud de refrescar el token de acceso y devuelve una respuesta JSON con el nuevo token de acceso. Se obtiene el token de refresco de la solicitud. Se refresca el token de acceso utilizando el método `refresh` de la instancia de Spotify. Si hay algún error, se devuelve una respuesta con código 400 y el mensaje de error. Si no hay ningún problema, se devuelve una respuesta JSON con el nuevo token de acceso.
