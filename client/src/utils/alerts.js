import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const formAlert = (data) => {
  if (data.error)
    return MySwal.fire({
      icon: "warning",
      title: "¡Ooppss! Algo ha salido mal...",
      text: data.message,
    });

  return MySwal.fire({
    icon: "success",
    title: "¡Genial!",
    text: "Su cita se agendó correctamente. Recibirá un correo electrónico con más detalles",
  });
};

export const errorAlert = () =>
  MySwal.fire({
    icon: "error",
    title: "Parece que algo ha salido mal",
    text: "Estaremos trabajado para restablecer el servicio",
  });
