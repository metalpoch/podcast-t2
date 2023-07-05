import Style from "./Footer.module.css";
import Logo from "../assets/PodTalk logo bigger.png";
import { FaAngleUp } from "react-icons/fa6";
import { useContext } from "react";
import { SheetContext } from "../context/SheetContext";

export default function Footer() {
  const { content } = useContext(SheetContext);

  return (
    <div className={`container ${Style.flex}`}>
      <img src={Logo} alt="PodTalk Logo" className={Style.image} />
      <a href="#nav" className={`textGradient ${Style.link}`}>
        {content.footer.return}
        <FaAngleUp className={Style.icon} />
      </a>
    </div>
  );
}
