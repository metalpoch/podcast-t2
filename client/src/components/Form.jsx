import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Loading from "./Loading";
import Style from "./Form.module.css";
import Micro from "../assets/microphone.png";
import { SheetContext } from "../context/SheetContext";
import "react-datepicker/dist/react-datepicker.css";

const URL = import.meta.env.VITE_DATA_CLIENTS_URL;

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
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [body, setBody] = useState({ language: LANGS[0].iso });
  const {
    subs: { data, loading },
  } = useContext(SheetContext);

  useEffect(() => {
    if (data && data.error) setError(data.error);
    if (data && !data.error)
      setAppointments(data.map((client) => dayjs(client.appointment).toDate()));
  }, [data]);
  const handler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };
  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;
  return (
    <section className={`container padding-y ${Style.flex}`} id="solicitar">
      <div className={Style.colLeft}>
        <img className={`${Style.image} ${Style.mask} `} src={Micro} />
      </div>
      <form className={Style.colRight} onSubmit={handler}>
        <h3 className="title">Solicita nuestro servicio</h3>

        <div className={Style.inputsContainer}>
          <div className={Style.formControl}>
            <label htmlFor="client">Nombre y Apellido</label>
            <input
              id="client"
              name="client"
              type="text"
              onChange={({ target }) =>
                setBody({ ...body, client: target.value })
              }
            />
          </div>

          <div className={Style.formControl}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={({ target }) =>
                setBody({ ...body, email: target.value })
              }
            />
          </div>
          <div className={Style.row}>
            <div className={Style.formControl}>
              <label htmlFor="appointment">Fecha</label>
              <DatePicker
                id="appointment"
                excludeDates={appointments}
                minDate={new Date()}
                selected={dayjs(body.appointment).toDate()}
                dateFormat="dd/MM/yyyy"
                onChange={(date) =>
                  setBody({
                    ...body,
                    appointment: dayjs(date).format("YYYY-MM-DD"),
                  })
                }
              />
            </div>
            <div className={Style.formControl}>
              <label htmlFor="language">Idioma</label>
              <select
                id="language"
                name="language"
                onChange={({ target }) =>
                  setBody({ ...body, language: target.value })
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
        </div>
        <input type="submit" value="Solicitar" className={Style.btn} />
      </form>
    </section>
  );
}
