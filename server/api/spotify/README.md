# Documentación Del Endpoint Spotify

### Importaciones

```python
import secrets

from flask import jsonify, redirect, request, session
from utils.spotify import Spotify

from . import route
```

- `secrets` se utiliza para generar un token aleatorio que se utilizará como estado en la autorización de Spotify.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web y manejar las solicitudes HTTP.
- `utils.spotify` es un módulo personalizado que contiene una clase Spotify que encapsula las funciones relacionadas con la API de Spotify.
- `route` es un objeto Blueprint que registra las rutas de la aplicación.

### Instancia de Spotify

```python
spotify = Spotify()
```

Se crea una instancia de la clase Spotify, que se utilizará para interactuar con la API de Spotify.

### Ruta `"/auth/"`

```python
@route.route("/auth/")
def auth():
    session["state"] = state = secrets.token_hex(120)
    url = spotify.url_auth_code_flow(state)
    return redirect(url)
```

Esta ruta maneja la URL de autorización de Spotify y redirige al usuario a la URL de autorización. Se genera un token de estado aleatorio y se guarda en la sesión. Se obtiene la URL de autorización utilizando el método `url_auth_code_flow` de la instancia de Spotify. Se devuelve una respuesta de redirección a la URL de autorización.

### Ruta `"/auth/callback/"`

```python
@route.route("/auth/callback/")
def spotify_callback():
    error = request.args.get("error")
    state = str(request.args.get("state"))
    code = str(request.args.get("code"))

    if error:
        response = jsonify({"error": error})
        response.status_code = 400
        return response
    elif state != session["state"]:
        response = jsonify({"error": "state_mismatch"})
        response.status_code = 400
        return response

    response = spotify.get_token(code)

    return jsonify(response)
```

Esta ruta maneja la URL de devolución de llamada de Spotify y devuelve una respuesta JSON con el token de acceso. Se obtienen los parámetros error, state y code de la solicitud. Si hay algún error, se devuelve una respuesta con código 400 y el mensaje de error. Si el estado no coincide con el guardado en la sesión, se devuelve una respuesta con código 400 y el mensaje "state_mismatch". Si no hay ningún problema, se obtiene el token de acceso utilizando el método `get_token` de la instancia de Spotify. Se devuelve una respuesta JSON con el token de acceso.

### Ruta `"/auth/refresh/"`

```python
@route.route("/auth/refresh/")
def refresh_auth():
    refresh_token = str(request.args.get("token"))
    if not refresh_token:
        return jsonify({"error": "refresh_token empty"})

    response = spotify.refresh_auth(refresh_token=refresh_token)

    return jsonify(response)
```

Esta ruta maneja la solicitud de refresco del token y devuelve una respuesta JSON con el nuevo token de acceso. Se obtiene el parámetro token de la solicitud. Si no hay ningún token, se devuelve una respuesta con el mensaje "refresh_token empty". Si hay un token, se refresca el token de acceso utilizando el método `refresh_auth` de la instancia de Spotify. Se devuelve una respuesta JSON con el nuevo token de acceso.
