# Documentación Del Endpoint Spotify

En este archivo README.md se proporcionará una documentación en español para el código proporcionado. El código es un ejemplo de una aplicación Flask que utiliza la biblioteca Spotify para la autenticación y autorización de usuarios. A continuación, se explicará cada función y su funcionalidad.

### Importaciones

El código comienza con las siguientes importaciones:

```python
import secrets
from flask import jsonify, redirect, request
from utils.spotify import Spotify
from utils.validations import validate_spotify_state
```

- `secrets` se utiliza para generar un token aleatorio que se utiliza en el proceso de autorización de Spotify.
- `flask` es el módulo principal de Flask, utilizado para crear la aplicación web.
- `jsonify` se utiliza para convertir los datos en formato JSON antes de enviarlos como respuesta.
- `redirect` se utiliza para redirigir al usuario a una URL específica.
- `request` se utiliza para acceder a los datos de la solicitud HTTP entrante.
- `Spotify` es una clase personalizada que proporciona funcionalidad relacionada con Spotify, como la generación de URL de autorización y la obtención de tokens de acceso.
- `validate_spotify_state` es una función personalizada que valida si el estado generado por `secrets` coincide con el estado recibido en la URL de autorización de Spotify.

### Ruta `"/auth"`

```python
@route.route("/auth")
def auth():
    state = secrets.token_hex(120)
    url = spotify.url_auth_code_flow(state)
    if validate_spotify_state(state, url):
        return redirect(url)
    else:
        return jsonify({"error": "state_mismatch"})
```

Esta ruta maneja la URL de autorización de Spotify y redirige al usuario a la URL de autorización generada por Spotify. La función `secrets.token_hex(120)` genera un token aleatorio de 120 caracteres que se utiliza como estado en el proceso de autorización. Luego, se llama al método `url_auth_code_flow(state)` de la instancia de la clase `Spotify` para generar la URL de autorización de Spotify. Si el estado generado coincide con el estado recibido en la URL de autorización de Spotify, se redirige al usuario a la URL de autorización. De lo contrario, se devuelve un mensaje de error en formato JSON.

### Ruta `"/auth/callback"`

```python
@route.route("/auth/callback")
def spotify_callback():
    error = request.args.get("error")
    code = str(request.args.get("code"))

    if error:
        return jsonify({"error": error})

    response = spotify.get_token(code)

    return jsonify(response)
```

Esta ruta maneja la URL de devolución de llamada de Spotify y devuelve una respuesta JSON con el token de acceso. La función `request.args.get("error")` obtiene el valor del parámetro "error" de la URL de devolución de llamada. Si hay un error, se devuelve un mensaje de error en formato JSON. De lo contrario, se obtiene el valor del parámetro "code" de la URL de devolución de llamada y se llama al método `get_token(code)` de la instancia de la clase `Spotify` para obtener el token de acceso. Luego, se devuelve la respuesta en formato JSON.

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
