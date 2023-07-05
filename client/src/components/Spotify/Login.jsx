import Style from "./Login.module.css";
import { FaSpotify } from "react-icons/fa6";
import { hexToken, authURL } from "../../utils/spotify";
import { useContext } from "react";
import { SheetContext } from "../../context/SheetContext";

export default function Login() {
	const { content } = useContext(SheetContext);

	const handleLogin = () => {
		const stateToken = hexToken(120);
		const url = authURL(stateToken);
		window.sessionStorage.setItem("state", stateToken);
		window.location.replace(url);
	};

	return (
		<>
			<div className={Style.grouper}>
				<h3 className="title textGradient">{content.spotify.listen}</h3>
				<button className={Style.btn} onClick={handleLogin}>
					<FaSpotify className={Style.logo} />
					<span className={`textGradient ${Style.btnText}`}>
						{content.spotify.login}
					</span>
				</button>
			</div>
		</>
	);
}
