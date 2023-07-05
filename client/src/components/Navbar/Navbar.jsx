import { useState } from "react";
import { ImMenu } from "react-icons/im";
import Select from "./Select";
import Style from "./Navbar.module.css";

export default function Navbar() {
	const [show, setShow] = useState(false);

	return (
		<nav className={`container ${Style.navbar}`} id="nav">
			<button className={Style.navButton} onClick={() => setShow(!show)}>
				<ImMenu />
			</button>
			<ul
				className={
					show ? `${Style.navGroup} ${Style.show}` : Style.navGroup
				}>
				<li>
					<a className={Style.link} href="#bienvenida">
						Bienvenida
					</a>
				</li>
				<li>
					<a className={Style.link} href="#spotify">
						Spotify
					</a>
				</li>
				<li>
					<a className={Style.link} href="#testimonials">
						Reseñas
					</a>
				</li>
				<li>
					<a
						className={`${Style.cta} textGradient`}
						href="#solicitar">
						Solicitar
					</a>
				</li>
				<li>
					<Select />
				</li>
			</ul>
		</nav>
	);
}
