import Login from "./Login";
import Podcasts from "./Podcasts";
import Logged from "./Logged";
import Style from "./Spotify.module.css";
import useSpotify from "../../hooks/useSpotify";

export default function Spotify() {
  const data = useSpotify();

  if (data.error) alert(JSON.stringify(data));

  return (
    <>
      <section className={`container padding-y ${Style.flex}`} id="spotify">
        <div className={Style.colLeft}>
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
        </div>

        <div className={Style.colRight}>
          {!data.access_token ? <Login /> : <Logged />}
        </div>
      </section>
      <section className={Style.bgDark}>
        {data.access_token && <Podcasts />}
      </section>
    </>
  );
}
