# Documentación Del Endpoint Spotify

En este archivo README.md se proporcionará una documentación en español para el código proporcionado. El código es un ejemplo de una aplicación Flask que utiliza la biblioteca Spotify para la autenticación y autorización de usuarios. A continuación, se explicará cada función y su funcionalidad.

```python
import secrets
from flask import jsonify, redirect, request, session
from utils.spotify import Spotify

### Importaciones
El código comienza con las siguientes importaciones:

```

- `secrets` se utiliza para generar un token aleatorio que se utilizará como estado en la autorización de Spotify.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web y manejar las solicitudes HTTP.
- `jsonify` se utiliza para convertir los datos en formato JSON antes de enviarlos como respuesta.
- `redirect` se utiliza para redirigir al usuario a una URL específica.
- `request` se utiliza para acceder a los datos de la solicitud HTTP entrante.
- `session` se utiliza para almacenar datos de sesión entre solicitudes.
- `Spotify` es una clase personalizada que proporciona funcionalidad relacionada con la API de Spotify.

### Ruta `"/auth/"`

```python
@route.route("/auth/")
def auth():
    session["state"] = state = secrets.token_hex(120)
    url = spotify.url_auth_code_flow(state)
    return redirect(url)
```

Esta ruta maneja la URL de autorización de Spotify y redirige al usuario a la URL de autorización. Primero, se genera un token aleatorio de 120 caracteres utilizando `secrets.token_hex()` y se almacena en la sesión del usuario. Luego, se obtiene la URL de autorización de Spotify utilizando el método `url_auth_code_flow()` de la instancia de la clase `Spotify`. Finalmente, se redirige al usuario a la URL de autorización utilizando `redirect()`.

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

Esta ruta maneja la URL de devolución de llamada de Spotify y devuelve una respuesta en formato JSON con el token de acceso. Se obtienen los parámetros `error`, `state` y `code` de la URL de devolución de llamada utilizando `request.args.get()`. Si hay un error en la autorización, se devuelve una respuesta de error con el código de estado 400. Si el estado no coincide con el valor almacenado en la sesión, se devuelve una respuesta de error con el código de estado 400. De lo contrario, se obtiene el token de acceso utilizando el método `get_token()` de la instancia de la clase `Spotify`. Finalmente, se devuelve una respuesta en formato JSON con el token de acceso.

### Ruta `"/auth/refresh"`

```python
@route.route("/auth/refresh")
def refresh_auth():
    refresh_token = str(request.args.get("token"))
    if not refresh_token:
        return jsonify({"error": "refresh_token empty"})

    response = spotify.refresh_auth(refresh_token=refresh_token)

    return jsonify(response)
```

Esta ruta maneja la solicitud de token de actualización y devuelve una respuesta JSON con el nuevo token de acceso. La función `request.args.get("token")` obtiene el valor del parámetro "token" de la URL. Si no se proporciona un token de actualización, se devuelve un mensaje de error en formato JSON. De lo contrario, se llama al método `refresh_auth(refresh_token=refresh_token)` de la instancia de la clase `Spotify` para obtener el nuevo token de acceso utilizando el token de actualización proporcionado. Luego, se devuelve la respuesta en formato JSON.
