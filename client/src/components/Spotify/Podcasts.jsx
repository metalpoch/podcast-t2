import Style from "./Podcasts.module.css";

export default function Podcasts() {
	return (
		<div className={`container padding-y ${Style.flex}`}>
			<h3 className="title textGradient">
				Escucha uno de nuestros podcast
			</h3>
			<div className={Style.podcastsContainer}>
				<iframe
					src="https://podcasters.spotify.com/pod/show/keiber-urbila/embed/episodes/Programador-Del-Desierto-e2643kq"
					frameBorder="0"
					scrolling="no"></iframe>
				<iframe
					src="https://podcasters.spotify.com/pod/show/christian-salzar/embed/episodes/Qu-hay-detrs-del-nuevo-logo-de-LaLiga---SportyGames-01-e264aph/a-aa1ti8b"
					frameBorder="0"
					scrolling="no"></iframe>
				<iframe
					src="https://podcasters.spotify.com/pod/show/miguel-petruzzella/embed/episodes/SportyGames---El-Submarino-Perdido-e264vdr"
					frameBorder="0"
					scrolling="no"></iframe>
			</div>
		</div>
	);
}
