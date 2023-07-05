import { useContext, useState } from "react";
import { ImMenu } from "react-icons/im";
import Select from "./Select";
import Style from "./Navbar.module.css";
import { SheetContext } from "../../context/SheetContext";

export default function Navbar() {
	const [show, setShow] = useState(false);

	const { content } = useContext(SheetContext);

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
						{content.navbar.welcome}
					</a>
				</li>
				<li>
					<a className={Style.link} href="#spotify">
						{content.navbar.spotify}
					</a>
				</li>
				<li>
					<a className={Style.link} href="#testimonials">
						{content.navbar.testimonials}
					</a>
				</li>
				<li>
					<a
						className={`${Style.cta} textGradient`}
						href="#solicitar">
						{content.navbar.request}
					</a>
				</li>
				<li>
					<Select />
				</li>
			</ul>
		</nav>
	);
}
