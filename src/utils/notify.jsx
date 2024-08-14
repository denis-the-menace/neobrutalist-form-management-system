import { toast } from "react-toastify";

const notify = (message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    zIndex: 999,
  });

export default notify;
