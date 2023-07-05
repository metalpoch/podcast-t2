/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { SheetContext } from "../../context/SheetContext";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import Style from "./ApplyForm.module.css";
import { formAlert, errorAlert } from "../../utils/alerts";
import "react-datepicker/dist/react-datepicker.css";

const URL = import.meta.env.VITE_DATA_CLIENTS_URL;

const LANGS = [
  { iso: "es", name: "Español" },
  { iso: "en", name: "English" },
  { iso: "de", name: "Deutsch" },
  { iso: "fr", name: "Français" },
];

export default function Form({ appointments, setAppointments, setWaiting }) {
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState(LANGS[0].iso);
  const [appointment, setAppointment] = useState(new Date());
  const { content } = useContext(SheetContext);

  const handler = (e) => {
    e.preventDefault();
    setWaiting(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client,
        email,
        language,
        appointment,
      }),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setClient("");
          setEmail("");
          setLanguage(LANGS[0].iso);
          setAppointment(new Date());
          setAppointments([...appointments, dayjs(appointment).toDate()]);
        }
        formAlert(res);
      })
      .catch((error) => {
        errorAlert(error);
      })
      .finally(() => setWaiting(false));
  };

  return (
    <form className={Style.colRight} onSubmit={handler}>
      <h3 className="title">{content.form.title}</h3>

      <div className={Style.inputsContainer}>
        <div className={Style.formControl}>
          <label htmlFor="client">{content.form.name}</label>
          <input
            id="client"
            name="client"
            type="text"
            value={client}
            onChange={({ target }) => setClient(target.value)}
          />
        </div>
        <div className={Style.formControl}>
          <label htmlFor="email">{content.form.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className={Style.row}>
          <div className={Style.formControl}>
            <label htmlFor="appointment">{content.form.date}</label>
            <DatePicker
              id="appointment"
              excludeDates={appointments}
              minDate={new Date()}
              selected={dayjs(appointment).toDate()}
              dateFormat="dd/MM/yyyy"
              onChange={(date) =>
                setAppointment(dayjs(date).format("YYYY-MM-DD"))
              }
            />
          </div>
          <div className={Style.formControl}>
            <label htmlFor="language">{content.form.language}</label>
            <select
              id="language"
              name="language"
              onChange={({ target }) => setLanguage(target.value)}
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
      <input type="submit" value={content.form.button} className={Style.btn} />
    </form>
  );
}
