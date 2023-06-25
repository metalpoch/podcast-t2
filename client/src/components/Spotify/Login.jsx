import Style from "./Login.module.css";
import { FaSpotify } from "react-icons/fa6";
import { hexToken, authURL } from "../../utils/spotify";

export default function Login() {
	const handleLogin = () => {
		const stateToken = hexToken(120);
		const url = authURL(stateToken);
		window.sessionStorage.setItem("state", stateToken);
		window.location.replace(url);
	};

	return (
		<>
			<div className={Style.grouper}>
				<h3 className="title textGradient">Escucha nuestros Podcast</h3>
				<button className={Style.btn} onClick={handleLogin}>
					<FaSpotify className={Style.logo} />
					<span className={`textGradient ${Style.btnText}`}>
						Iniciar sesión en Spotify
					</span>
				</button>
			</div>
		</>
	);
}
