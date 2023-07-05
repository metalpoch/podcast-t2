import Login from "./Login";
import Podcasts from "./Podcasts";
import Logged from "./Logged";
import Style from "./Spotify.module.css";
import useSpotify from "../../hooks/useSpotify";
import { useContext } from "react";
import { SheetContext } from "../../context/SheetContext";

export default function Spotify() {
	const data = useSpotify();

	const { content } = useContext(SheetContext);

	if (data.error) alert(JSON.stringify(data));

	return (
		<>
			<section
				className={`container padding-y ${Style.flex}`}
				id="spotify">
				<div className={Style.colLeft}>
					<h3 className="title">{content.spotify.title}</h3>
					<p>{content.spotify.text1}</p>
					<p>{content.spotify.text2}</p>
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
