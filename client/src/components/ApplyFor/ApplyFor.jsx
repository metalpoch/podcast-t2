import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import Form from "./Form";
import Style from "./ApplyFor.module.css";
import Loading from "../Loading";
import Micro from "../../assets/microphone.png";
import { SheetContext } from "../../context/SheetContext";

export default function ApplyFor() {
  const [waiting, setWaiting] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const {
    subs: { data, loading },
  } = useContext(SheetContext);

  useEffect(() => {
    if (data && data.error) setError(data.error);
    if (data && !data.error)
      setAppointments(data.map((client) => dayjs(client.appointment).toDate()));
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <section className={`container padding-y ${Style.flex}`} id="solicitar">
      <div className={Style.colLeft}>
        <img className={`${Style.image} ${Style.mask} `} src={Micro} />
      </div>
      {waiting ? (
        <div className={Style.colRight}>
          <Loading />
        </div>
      ) : (
        <Form
          appointments={appointments}
          setAppointments={setAppointments}
          setWaiting={setWaiting}
        />
      )}
    </section>
  );
}
