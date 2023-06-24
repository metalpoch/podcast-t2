import Style from "./Hero.module.css";
import Girl from "../assets/girl.png";
import Logo from "../assets/PodTalk ogo.png";

export default function Hero() {
  return (
    <>
      <div className={`container ${Style.flex}`} id="spotify">
        <section className={Style.colLeft}>
          <img src={Logo} />
          <h1 className="title">
            Potencia tu podcast con nuestros servicios especializados
          </h1>
          <p>
            Te ayudamos a llevar tu idea al siguiente nivel para que destaques
            en el mundo del podcasting
          </p>
          <br />
          <a className={Style.btn} href="#solicitar">
            Solicitar
          </a>
        </section>
        <section className={Style.colRight}>
          <img className={Style.image} src={Girl} />
        </section>
      </div>
    </>
  );
}
