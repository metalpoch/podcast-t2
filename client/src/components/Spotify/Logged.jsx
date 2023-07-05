import Style from "./Logged.module.css";

export default function Logged() {
  return (
    <div className={Style.grouper}>
      <h3 className="title textGradient">¡Gracias por iniciar sesión!</h3>
      <p>Baja y descubre nuestro estilo en los Podcast</p>
    </div>
  );
}
