import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../context/SheetContext";

export default function Testimonial() {
  const [error, setError] = useState(null);
  const [testimonials, setTestimoniasl] = useState([]);
  const {
    podcasters: { data, loading },
  } = useContext(SheetContext);

  useEffect(() => {
    if (data && data.error) setError(data.error);
    if (data && !data.error)
      setTestimoniasl(
        data.map((client, index) => ({
          id: index,
          name: client.name,
          picture: client.picture,
          title: client.reviewTitle,
          message: client.reviewMessage,
        }))
      );
  }, [data]);

  if (loading) return <h1>CARGANDO...(ANIMACIÓN BURDA DE LACRA)</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="container">
      <h1
        className="title"
        style={{ background: "brown", marginTop: 0, padding: 400 }}
      >
        TESTIMONIALS
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
