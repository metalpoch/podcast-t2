/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { SheetContext } from "../../context/SheetContext";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import Style from "./ApplyForm.module.css";
import { formAlert, errorAlert } from "../../utils/alerts";
import "react-datepicker/dist/react-datepicker.css";

const URL = import.meta.env.VITE_DATA_CLIENTS_URL;

export default function Form({ appointments, setAppointments, setWaiting }) {
  const { content, language, languages } = useContext(SheetContext);

  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [appointment, setAppointment] = useState(new Date());
  const [emailLang, setEmailLang] = useState(language);

  const handler = (e) => {
    e.preventDefault();
    setWaiting(true);
    console.log({
      client,
      email,
      language: emailLang,
      appointment,
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client,
        email,
        language: emailLang,
        appointment,
      }),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setClient("");
          setEmail("");
          setEmailLang(language);
          setAppointment(new Date());
          setAppointments([...appointments, dayjs(appointment).toDate()]);
        }
        formAlert(res);
      })
      .catch((error) => {
        console.log(error);
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
            required
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
            required
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
              onChange={({ target: { value } }) => setEmailLang(value)}
            >
              {languages.map((lang) => (
                <option
                  key={lang.iso}
                  value={lang.iso}
                  selected={language == lang.iso ? true : false}
                >
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
