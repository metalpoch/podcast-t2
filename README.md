
# Podcast T2

¡Bienvenido al servicio web líder en creación de podcast para Spotify! Con nuestra herramienta fácil de usar, puedes crear y publicar tus episodios en Spotify de una manera sencilla y eficiente.

## Tecnologías 🛰️

Esta landing page actualmente trabaja con las siguientes tecnologías:

- [Python]: es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.
- [Flask]: es un micromarco utilizado para el desarrollo de aplicaciones web en Python.
- [Node.js]: es un entorno de ejecución para JavaScript construido con V8, motor de JavaScript de Chrome.
- [React]: es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas en aplicaciones web.
- [Vite]: es una herramienta de compilación que tiene como objetivo proporcionar una experiencia de desarrollo de aplicaciones web más rápida y eficiente.

## Instalación y uso de manera local 💾

#### Clona este repositorio [GitHub] y acceda al directorio e instale las dependencias globales

```bash
git clone https://github.com/metalpoch/podcast-t2.git
cd podcast-t2
npm install
```

#### Instale las dependencias del frontend usando [npm]

```bash
cd client
npm install
```

### Instale las dependencias del backend usando [pip]

#### Cree y habilite el entorno virtual para instalar las dependencias

Usando virtualenv (se instala mediante [pip])

```bash
cd ../server
virtualenv venv
source venv/bin/activate # activar desde linux
pip install -r requeriments.txt
```

o en su defecto con venv (viene por defecto en las librerias de Python)

```bash
cd ../server
python -m venv venv
source venv/bin/activate # activar desde linux
pip install -r requeriments.txt
```

## Credenciales de [Spotify Api's] 🗝️

Para consumir la api de desarrollo de spotify se debe crear un fichero credentials.py dentro del directorio server, a la mismo nivel de main.py con el siguiente contenido

```python
SPOTIFY_REDIRECT = "" # url de redireccionamiento de spotify
SPOTIFY_CLIENT_ID = "" # id de la cuenta de desarrollo de Spotify
SPOTIFY_CLIENT_SECRET = "" # secret de la cuenta de desarrollo de Spotify
```

## Ejecucion local del servidor 🔌

Es importante tener en cuenta que el backend de python se debe encontrar en un entorno virtual para que funcione la ejecución del backend y frontend en simultaneo

```bash
npm run dev
```

## Estructura del proyecto 🏗️

```
├── README.md           # Esta humilde documentación que estas leyendo 😉
├── client              # frontend creado con Vite
│   ├── index.html        # html inicial de React
│   ├── public/           # directorio para el almacenamiento favicon.ico
│   ├── src               # directorio principal de los componentes
└── server              # backend contruido con Flask blueprints
    ├── api               # modulos por ruta del endpoint /api/
    │   ├── email/        # endpoint /api/email
    │   ├── sheet/        # endpoint /api/sheet
    │   └── spotify/      # endpoint /api/spotify
    ├── credentials.py    # credenciales de las API's
    ├── main.py           # script inicial del backend
    ├── requeriments.txt  # lista de modulos requeridos
    └── utils/            # directorio de modulos o librerias de utilidad
```

[python]: https://www.python.org/
[node.js]: https://nodejs.org/en
[flask]: https://flask.palletsprojects.com/en/2.3.x/
[react]: https://react.dev/
[github]: https://github.com/metalpoch/podcast-t2.git
[pip]: https://pip.pypa.io/en/stable/
[npm]: https://www.npmjs.com/
[vite]: https://vitejs.dev/
[Spotify]: https://open.spotify.com/
[Spotify Api's]: https://developer.spotify.com/
