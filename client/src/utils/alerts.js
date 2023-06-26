import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const formAlert = (data) => {
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

export const errorAlert = () =>
  MySwal.fire({
    icon: "error",
    title: "Parece que algo ha salido mal",
    text: "Estaremos trabajado para restablece el servicio",
  });
