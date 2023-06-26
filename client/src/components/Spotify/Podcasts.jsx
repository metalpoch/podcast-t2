import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../../context/SheetContext";
import Loading from "../Loading";
import Style from "./Podcasts.module.css";

export default function Podcasts() {
	const [podcasts, setPodcasts] = useState([]);
	const { podcasters } = useContext(SheetContext);

	useEffect(() => {
		if (podcasters.data)
			setPodcasts(
				podcasters.data
					.map((podcast) => ({
						id: podcast.client,
						url: podcast.url,
					}))
					.filter((pod) => pod.url !== "")
			);
	}, [podcasters]);

	if (podcasts.loading) return <Loading />;

	return (
		<div className={`container padding-y ${Style.flex}`}>
			<h3 className="title textGradient">
				Escucha uno de nuestros podcast
			</h3>
			<div className={Style.podcastsContainer}>
				{podcasts.map((podcast) => (
					<iframe
						key={podcast.id}
						src={podcast.url}
						frameBorder="0"
						scrolling="no"
						loading="lazy"></iframe>
				))}
			</div>
		</div>
	);
}
