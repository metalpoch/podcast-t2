import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../context/SheetContext";

export default function Testimonial() {
  const [testimonials, setTestimoniasl] = useState([]);
  const { podcasters } = useContext(SheetContext);

  useEffect(() => {
    if (podcasters.data)
      setTestimoniasl(
        podcasters.data.map((client, index) => ({
          id: index,
          name: client.name,
          picture: client.picture,
          title: client.reviewTitle,
          message: client.reviewMessage,
        }))
      );
  }, [podcasters]);

  return (
    <div className="container">
      <h1
        className="title"
        style={{ background: "brown", marginTop: 0, padding: 400 }}
      >
        TESTIMONIALS
        {podcasters.loading && <h1>CARGANDO...(ANIMACIÓN BURDA DE LACRA)</h1>}
        {testimonials.map((user) => (
          <div key={user.id} className="card">
            <img src={user.picture} />
            <h2>{user.name}</h2>
            <h3>{user.title}</h3>
            <p>{user.message}</p>
          </div>
        ))}
      </h1>
    </div>
  );
}
