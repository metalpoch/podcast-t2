# Podcast T2

<img width="150" src="https://cdn.leonardo.ai/users/9698033d-86b5-411b-8d8f-fc9209ef1ff6/generations/2bd8e45a-f69b-4040-a89c-a4641945a0fe/DreamShaper_v5_STICKER_A_detailed_illustration_a_print_of_a_po_2.jpg"><a href="https://github.com/metalpoch/podcast-t2"><img src="https://readme-typing-svg.demolab.com?font=VT323&size=27&duration=1000&vCenter=true&repeat=false&width=435&lines=Escuchamos...;Mejoramos...;Promocionamos...;Publicamos...;%F0%9F%8E%A7+Para+hacer+ralidad+tu+mejor+Podcast." alt="Typing SVG" /></a>

¡Bienvenido al servicio web líder en creación de podcast para Spotify! Con nuestra herramienta fácil de usar, puedes crear y publicar tus episodios en Spotify de una manera sencilla y eficiente.

## Tecnologías 🛰️

Esta landing page actualmente trabaja con las siguientes tecnologías:

- [Python]: es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.
  - [Flask]: es un micromarco utilizado para el desarrollo de aplicaciones web en Python.
  - [Flask-Mail]: es una extensión de Flask que permite enviar correos electrónicos desde una aplicación web Flask.
- [SheetDB]: es una plataforma en línea que permite convertir las hojas de cálculo de Google en una API JSON.
- [Node.js]: es un entorno de ejecución para JavaScript construido con V8, motor de JavaScript de Chrome.
  - [React]: es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas en aplicaciones web.

## Instalación y uso de manera local 💾

### Clona este repositorio [GitHub]

```bash
git clone https://github.com/metalpoch/podcast-t2.git
```

### Instale las dependencias

¡La instalacion de las dependencias es mas facil que nunca! Solo ejecute uno de los siguientes script basado en su sistema operativo.

```bash
# En Linux/MacOS
cd podcast-t2
npm run installOnLinux
```

```cmd
:: En Windows
cd podcast-t2
npm run installOnWindows
```

Estos script instalaran las dependencias del frontend y del backend en flask, usando los entornos virtuales e instalando las dependencias en dichos entornos.

## Credenciales de [Spotify Api's] e E-Mail 🗝️

Para consumir la api de desarrollo de spotify se deben crear las siguientes variables de entorno

```bash
SPOTIFY_REDIRECT = "" # url de redireccionamiento de spotify
SPOTIFY_CLIENT_ID = "" # id de la cuenta de desarrollo de Spotify
SPOTIFY_CLIENT_SECRET = "" # secret de la cuenta de desarrollo de Spotify

SHEET_SECRET = "" # secret de la hoja ded calculo sheetdb.io
SHEET_PODCAST_URL = "" # url de la hoja de calculo de podcasts finalizados
SHEET_SUBSCRIPTIONS_URL = "" # url de la hoja de calculo de clientes subscritos


# Esta configuración SMTP esta basada en el servicio de Google
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USERNAME = ""
MAIL_PASSWORD = ""
```

## Ejecucion local⚡

Esta es la parte mas dificil y complicada debido a la gran cantidad de comandos que hay que utilizar

```bash
npm run dev # ¡Listo!
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
    │   ├── sheet/        # endpoint /api/sheet
    │   └── spotify/      # endpoint /api/spotify
    ├── credentials.py    # credenciales de las API's
    ├── main.py           # script inicial del backend
    ├── requeriments.txt  # lista de modulos requeridos
    └── utils/            # directorio de modulos o librerias de utilidad
```

[python]: https://www.python.org/
[flask-mail]: https://pythonhosted.org/Flask-Mail/
[node.js]: https://nodejs.org/en
[flask]: https://flask.palletsprojects.com/en/2.3.x/
[react]: https://react.dev/
[github]: https://github.com/metalpoch/podcast-t2.git
[pip]: https://pip.pypa.io/en/stable/
[npm]: https://www.npmjs.com/
[vite]: https://vitejs.dev/
[spotify]: https://open.spotify.com/
[spotify api's]: https://developer.spotify.com/
[sheetdb]: https://sheetdb.io/
