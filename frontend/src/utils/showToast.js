import {toast} from 'react-toastify'

export const showToast = (message, options = {}) => {
  toast(message, options);
};
