import Style from "./Navbar.module.css";

export default function Navbar() {
	return (
		<nav className={`container ${Style.navbar}`}>
			<ul className={Style.flex}>
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
					<a className={`${Style.cta} textGradient`} href="#solicitar">
						Solicitar
					</a>
				</li>
			</ul>
		</nav>
	);
}
