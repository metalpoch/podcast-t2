import Style from "./Footer.module.css";
import Logo from "../assets/PodTalk logo bigger.png";
import { FaAngleUp } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className={`container ${Style.flex}`}>
      <img src={Logo} alt="PodTalk Logo" className={Style.image} />
      <a href="#nav" className={`textGradient ${Style.link}`}>
        Ir al inicio
        <FaAngleUp className={Style.icon} />
      </a>
    </div>
  );
}
