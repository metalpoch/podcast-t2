import Style from "./Hero.module.css";
import Girl from "../assets/girl.png";
import Logo from "../assets/PodTalk ogo.png";
import { useContext } from "react";
import { SheetContext } from "../context/SheetContext";

export default function Hero() {
	const { content } = useContext(SheetContext);

	return (
		<section
			className={`container  padding-y ${Style.flex}`}
			id="bienvenida">
			<div className={Style.colLeft}>
				<img className={Style.logo} src={Logo} />
				<h1 className="title">{content.hero.title}</h1>
				<p>{content.hero.text}</p>
				<a className={Style.btn} href="#solicitar">
					{content.hero.button}
				</a>
			</div>
			<div className={`${Style.colRight} ${Style.mask}`}>
				<img className={Style.image} src={Girl} />
			</div>
		</section>
	);
}
