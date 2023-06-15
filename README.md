# Podcast T2

¡Bienvenido al servicio web líder en creación de podcast para Spotify! Con nuestra herramienta fácil de usar, puedes crear y publicar tus episodios en Spotify de una manera sencilla y eficiente.

## Tecnologías
Esta landing page actualmente trabaja con las siguientes tecnologías open sources:
- [Python] - Python es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.
- [Node.js] - Node.js® es un entorno de ejecución para JavaScript construido con V8, motor de JavaScript de Chrome.
- [Flask] - Flask es un micromarco utilizado para el desarrollo de aplicaciones web en Python.
- [React] - React es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas en aplicaciones web.

## Instalación y uso de manera local

#### Clona este repositorio [GitHub] y acceda al directorio

```bash
git clone https://github.com/metalpoch/podcast-t2.git
cd podcast-t2
```

#### Instale las dependencias del frontend usando [npm]

```bash
cd client
npm install
```

### Regrese al directorio principal
```bash
cd ..
```

#### Instale las dependencias del backend usando [pip]
```bash
cd server
pip install -r requeriments.txt
```

## Credenciales de la API Spotify
Para consumir la api de desarrollo de spotify se debe crear un fichero credentials.py dentro del directorio server, a la mismo nivel de main.py con el siguiente contenido
```python
SPOTIFY_REDIRECT = "" # url de redireccionamiento de spotify
SPOTIFY_CLIENT_ID = "" # id de la cuenta de desarrollo de Spotify
SPOTIFY_CLIENT_SECRET = "" # secret de la cuenta de desarrollo de Spotify
```

# Ejecucion del servidor
##### Usando flask run (Linux)
```bash
cd server
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```

##### Usando app.run() (multi plataforma)
```bash
cd server
python main.py
```

[//]: #
   [Python]: <https://www.python.org/>
   [Node.js]: <https://nodejs.org/en>
   [Flask]: <https://flask.palletsprojects.com/en/2.3.x/>
   [React]: <https://react.dev/>
   [GitHub]: <https://github.com/metalpoch/podcast-t2.git>
   [pip]: <https://pip.pypa.io/en/stable/>
   [npm]: <[https://choosealicense.com/licenses/mit/](https://www.npmjs.com/)>
