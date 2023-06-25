import { useContext } from "react";
import { SheetContext } from "../../context/SheetContext";
import Style from "./Podcasts.module.css";

export default function Podcasts() {
  const { podcasters } = useContext(SheetContext);

  const podcasts = podcasters.data
    .map((podcast) => ({
      id: podcast.client,
      url: podcast.url,
    }))
    .filter((pod) => pod.url !== "");

  return (
    <div className={`container padding-y ${Style.flex}`}>
      <h3 className="title textGradient">Escucha uno de nuestros podcast</h3>
      <div className={Style.podcastsContainer}>
        {podcasts.map((podcast) => (
          <iframe
            key={podcast.id}
            src={podcast.url}
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        ))}
      </div>
    </div>
  );
}
