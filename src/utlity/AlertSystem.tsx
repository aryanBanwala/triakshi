import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default options
const options = {
  position: "top-right" as const,
  autoClose: 3000, // 3 seconds
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
  closeOnClick: true,
  zIndex: 1000
};

// Success alert
export const toastSuccess = (message: string) => {
  toast.success(message, options);
};

// Info alert
export const toastInfo = (message: string) => {
  toast.info(message, options);
};

// Error alert
export const toastError = (message: string) => {
  toast.error(message, options);
};
