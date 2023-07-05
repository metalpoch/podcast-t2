import { useContext, useState } from "react";
import { ImMenu } from "react-icons/im";
import Style from "./Navbar.module.css";
import { SheetContext } from "../context/SheetContext";

export default function Navbar() {
  const {language, setLanguage} = useContext(SheetContext)
  const handleSelect = (event )=>{
setLanguage(event.target.value)
console.log(language)
  }
  const [show, setShow] = useState(false);
  return (
    <nav className={`container ${Style.navbar}`} id="nav">
      <button className={Style.navButton} onClick={() => setShow(!show)}>
        <ImMenu />
      </button>
      <ul className={show ? `${Style.navGroup} ${Style.show}` : Style.navGroup}>
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
        <li>
          <select name="language" onChange={handleSelect} id="language">
            <option value="es">es</option>
            <option value="en">en</option>
            <option value="fr">fr</option>
            <option value="de">de</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}
