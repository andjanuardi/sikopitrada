import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function showModal(html) {
  const modal = withReactContent(Swal);
  modal.fire({
    padding: 0,
    allowOutsideClick: false,
    showConfirmButton: false,
    width: "fit-content",
    html: html,
  });
}

export function closeModal() {
  Swal.close();
}
