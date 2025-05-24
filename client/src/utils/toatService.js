// src/utils/toastService.js
import { toast } from 'react-toastify';

export const showToast = ({ type = 'default', message, position = 'top-right', autoClose = 3000 }) => {
  const options = {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };

  switch (type) {
  case 'success':
    toast.success(message, options);
    break;
  case 'error':
    toast.error(message, options);
    break;
  case 'info':
    toast.info(message, options);
    break;
  case 'warn':
  case 'warning':
    toast.warn(message, options);
    break;
  default:
    toast(message, options);
  }
};
