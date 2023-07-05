import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../../context/SheetContext";
import Loading from "../Loading";
import Style from "./Podcasts.module.css";

export default function Podcasts() {
	const [error, setError] = useState(null);
	const [podcasts, setPodcasts] = useState([]);
	const {
		podcasters: { data, loading },
		content,
	} = useContext(SheetContext);

	useEffect(() => {
		if (data && data.error) setError(data.error);
		if (data && !data.error)
			setPodcasts(
				data
					.map((podcast) => ({
						id: podcast.client,
						url: podcast.url,
					}))
					.filter((pod) => pod.url !== "")
			);
	}, [data]);

	if (loading) return <Loading />;
	if (error) return <h1>{error}</h1>;

	return (
		<div className={`container padding-y ${Style.flex}`}>
			<h3 className="title textGradient">{content.spotify.podcast}</h3>
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
