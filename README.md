<a href="https://podcast-t2.vercel.app/" target="_blank"><img src="https://i.ibb.co/fnHXVBQ/podcast-T2.png" alt="banner"/></a>
![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=19&duration=1000&pause=200&color=C93BC5&vCenter=true&repeat=false&width=435&lines=Escuchamos...;Mejoramos...;Publicamos...;Para+hacer+realidad+tu+mejor+Podcast.)
# Podcast-T2
¡Bienvenidos al servicio web líder en creación de podcast para [Spotify for Podcasters]! Con nuestra herramienta fácil de usar, puedes crear y publicar tus episodios de una manera sencilla y eficiente.

¿Qué estás esperando para dar un vistazo? Haz [click en aquí para ir](https://podcast-t2.vercel.app/)

## 🛰️ Nuestra Landing Page utiliza las siguientes Tecnologías 

Esta landing page actualmente trabaja con las siguientes tecnologías:

- [SheetDB]: es una plataforma en línea que permite convertir las hojas de cálculo de Google en una API JSON.
- [Python]: es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.
  - [Flask]: es un microframework utilizado para el desarrollo de aplicaciones web en Python.
- [Node.js]: es un entorno de ejecución para JavaScript construido con V8, motor de JavaScript de Chrome.
  - [React]: es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas en aplicaciones web.
 

##  💾 Instalación y uso de manera local

### Clona este repositorio [GitHub]

```bash
git clone https://github.com/metalpoch/podcast-t2.git
```

### Instale las dependencias

¡La instalación de las dependencias es mas fácil que nunca! Solo ejecute uno de los siguientes script basado en su sistema operativo.

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

## 🗝️ Variables De Entorno
### Variables del frontend 📱
```bash
VITE_SPOTIFY_AUTH_URL="https://accounts.spotify.com/authorize"
VITE_SPOTIFY_URL_REDIRECT="http://localhost:5173/#spotify"
VITE_SPOTIFY_CLIENT_ID="client-id-otorgado por Spotify"
VITE_SPOTIFY_URL_TOKEN="http://localhost:5000/api/spotify/auth"
VITE_DATA_CLIENTS_URL="http://localhost:5000/api/sheet/"
VITE_DATA_SUBCRIPTORS_URL="http://localhost:5000/api/sheet/subs"
```
### Variables del backend 🗄️
```bash
SHEET_SECRET="token-super-secreto-otorgado-por-sheetdb"
SHEET_PODCAST_URL="api-url-de-la-hoja-de-calculo-de-sheetdb"
SPOTIFY_REDIRECT="http://localhost:5173/#spotify"
SPOTIFY_CLIENT_ID="client-id-otorgado por Spotify"
SPOTIFY_CLIENT_SECRET="client-secret-otorgado por Spotify"
MAIL_PORT=465
MAIL_SERVER="smtp.gmail.com"
MAIL_USERNAME="email@gmail.com"
MAIL_PASSWORD="contraseña-de-aplicación"
```

## ⚡Ejecucion local

Esta es la parte mas difícil y complicada debido a la gran cantidad de comandos que hay que utilizar

```bash
npm run dev # ¡Listo!
```

## Estructura del proyecto 🏗️
```
├── README.md           # Esta humilde documentación que estas leyendo 😉
├── client              # frontend creado con Vite
|   ├── .env              # variables de entorno del frontend
│   ├── index.html        # html inicial de React
│   ├── public/           # directorio para el almacenamiento favicon.ico
│   ├── src               # directorio principal de los componentes y hooks de React
└── server              # backend contruido con Flask blueprints
    ├── api               # modulos por ruta del endpoint /api/
    │   ├── sheet/        # endpoint /api/sheet
    │   └── spotify/      # endpoint /api/spotify
    ├── main.py           # script inicial del backend
    ├── .env              # variables de entorno del backend
    ├── requeriments.txt  # lista de modulos requeridos
    └── utils/            # directorio de modulos o librerias de utilidad
```

[python]: https://www.python.org/
[flask]: https://flask.palletsprojects.com/en/2.3.x/
[node.js]: https://nodejs.org/en
[react]: https://react.dev/
[github]: https://github.com/metalpoch/podcast-t2.git
[Spotify for Podcasters]: https://podcasters.spotify.com/
[sheetdb]: https://sheetdb.io/
