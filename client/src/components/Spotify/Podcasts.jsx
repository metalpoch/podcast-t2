export default function Podcasts() {
  return (
    <div className="container">
      <h3 className="title textGradient">Escucha uno de nuestro Podcast</h3>
      <iframe
        src="https://podcasters.spotify.com/pod/show/keiber-urbila/embed/episodes/Programador-Del-Desierto-e2643kq"
        height="102px"
        width="400px"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://podcasters.spotify.com/pod/show/christian-salzar/embed/episodes/Qu-hay-detrs-del-nuevo-logo-de-LaLiga---SportyGames-01-e264aph/a-aa1ti8b"
        height="102px"
        width="400px"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://podcasters.spotify.com/pod/show/miguel-petruzzella/embed/episodes/SportyGames---El-Submarino-Perdido-e264vdr"
        height="102px"
        width="400px"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}
