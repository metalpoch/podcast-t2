import Style from "./Form.module.css";
import Micro from "../assets/microphone.png";
import { useState } from "react";

const LANGS = [
  { iso: "es", name: "Español" },
  { iso: "en", name: "English" },
  { iso: "de", name: "Deutsch" },
  { iso: "fr", name: "Français" },
  { iso: "it", name: "Italiano" },
  { iso: "pt", name: "Português" },
  { iso: "ja", name: "日本語" },
];

export default function Form() {
  const [data, setData] = useState({ lang: LANGS[0].iso });

  const handler = (e) => {
    e.preventDefault();
    alert(JSON.stringify(data));
  };

  return (
    <section className={`container ${Style.flex}`} id="service">
      <div className={Style.colLeft}>
        <img className={`${Style.image} ${Style.mask} `} src={Micro} />
      </div>
      <form className={Style.colRight}>
        <h3 className="title">Solicita nuestro servicio</h3>

        <div className={Style.formControl}>
          <label htmlFor="fullname">Nombre y Apellido</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            onChange={({ target }) =>
              setData({ ...data, fullname: target.value })
            }
          />
        </div>

        <div className={Style.formControl}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={({ target }) => setData({ ...data, email: target.value })}
          />
        </div>

        <div className={Style.row}>
          <div className={Style.formControl}>
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={({ target }) =>
                setData({ ...data, date: target.value })
              }
            />
          </div>

          <div className={Style.formControl}>
            <label htmlFor="lang">Idioma</label>
            <select
              id="lang"
              name="lang"
              onChange={({ target }) =>
                setData({ ...data, lang: target.value })
              }
            >
              {LANGS.map((lang, idx) => (
                <option key={idx} value={lang.iso}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className={Style.btn} onClick={handler}>
          Solicitar
        </button>
      </form>
    </section>
  );
}
