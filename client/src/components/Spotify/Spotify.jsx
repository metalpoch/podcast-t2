import Login from "./Login";
import Podcasts from "./Podcasts";
import Style from "./Spotify.module.css";
import useSpotify from "../../hooks/useSpotify";

export default function Spotify() {
	const { isLogin, error } = useSpotify();
	if (error) alert(error);
	return (
		<div className={`container ${Style.flex} padding-y`} id="spotify">
			<section className={Style.colLeft}>
				<h3 className="title">
					¿Quieres publicar tu podcast en Spotify y llegar a una
					audiencia global?
				</h3>
				<p>
					Somos una plataforma fácil de usar que te permite publicar
					tu podcast en Spotify y llegar a más de 450 millones de
					oyentes en más de 200 países y regiones
				</p>
				<p>
					Además, si necesitas más información sobre cómo publicar tu
					podcast en Spotify, te podemos ayudar.
				</p>
			</section>
			<section className={Style.colRight}>
				{isLogin ? <Podcasts /> : <Login />}
			</section>
		</div>
	);
}
