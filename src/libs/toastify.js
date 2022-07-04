import { toast } from "react-toastify";

const toastify = {
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  },
  info: (message) => {
    toast.info(message);
  },
  warning: (message) => {
    toast.warning(message);
  },
};

export default toastify;
