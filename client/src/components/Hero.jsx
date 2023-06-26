import Style from "./Hero.module.css";
import Girl from "../assets/girl.png";
import Logo from "../assets/PodTalk ogo.png";

export default function Hero() {
  return (
    <section className={`container  padding-y ${Style.flex}`} id="bienvenida">
      <div className={Style.colLeft}>
        <img className={Style.logo} src={Logo} />
        <h1 className="title">
          Potencia tu podcast con nuestros servicios especializados
        </h1>
        <p>
          Te ayudamos a llevar tu idea al siguiente nivel para que destaques en
          el mundo del podcasting
        </p>
        <a className={Style.btn} href="#solicitar">
          Solicitar
        </a>
      </div>
      <div className={`${Style.colRight} ${Style.mask}`}>
        <img className={Style.image} src={Girl} />
      </div>
    </section>
  );
}
