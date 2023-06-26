import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Loading from "./Loading";
import Style from "./Form.module.css";
import Micro from "../assets/microphone.png";
import { SheetContext } from "../context/SheetContext";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
const MySwal = withReactContent(Swal);

const formAlert = (data) => {
  if (data.error)
    return MySwal.fire({
      icon: "warning",
      title: "Oppss! Algo ha salido mal",
      text: data.message,
    });

  return MySwal.fire({
    icon: "success",
    title: "Felicidates!!",
    text: "Su cita se agendo correctamente. Recibira un correo electronico con mas detalles",
  });
};

const errorAlert = () =>
  MySwal.fire({
    icon: "error",
    title: "Parece que algo ha salido mal",
    text: "Estaremos trabajado para restablece el servicio",
  });

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

  const handler = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) setBody({ language: LANGS[0].iso });

        formAlert(res);
      })
      .catch((error) => errorAlert(error));
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
              value={body.client}
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
              value={body.email}
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
