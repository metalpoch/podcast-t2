import { useEffect, useState } from "react";
import Login from "./Login";
import Podcasts from "./Podcasts";
import Style from "./Spotify.module.css";
import useFetch from "../../hooks/useFetch";

export default function Spotify() {
  const [isLogin, setIsLogin] = useState(false);
  const [url, setUrl] = useState({});

  const { response, loading, error } = useFetch(url);
  console.log(response);
  console.log(loading);
  console.warn(error);

  useEffect(() => {
    if (response && response.access_token) setIsLogin(true);
  }, [response]);

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const data = {
        code: params.get("code"),
        state: params.get("state"),
      };
      window.history.pushState(null, null, "/");
      setUrl({
        url: import.meta.env.VITE_SPOTIFY_URL_TOKEN,
        options: {
          method: "POST",
          //headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      });
    }
  }, []);

  return (
    <>
      <div className={`container ${Style.flex}`} id="spotify">
        <section className={Style.colLeft}>
          <h3 className="title">
            ¿Quieres publicar tu podcast en Spotify y llegar a una audiencia
            global?
          </h3>
          <p>
            Somos una plataforma fácil de usar que te permite publicar tu
            podcast en Spotify y llegar a más de 450 millones de oyentes en más
            de 200 países y regiones
          </p>
          <p>
            Además, si necesitas más información sobre cómo publicar tu podcast
            en Spotify, te podemos ayudar.
          </p>
        </section>
        <section className={Style.colRight}>
          {isLogin ? <Podcasts /> : <Login />}
        </section>
      </div>
    </>
  );
}
