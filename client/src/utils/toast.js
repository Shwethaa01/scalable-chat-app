import { toast } from 'react-toastify';

const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

// Toast types
export const showSuccess = (message) => {
    toast.success(message, toastOptions);
};

export const showError = (message) => {
    toast.error(message || "Something went wrong!", toastOptions);
};

export const showInfo = (message) => {
    toast.info(message, toastOptions);
};
