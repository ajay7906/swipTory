
import { toast } from 'react-toastify';

export const showToast = (message, options = {}) => {
  toast(message, {
    ...options,
    style: {
      fontSize: '16px', 
      ...options.style 
    }
  });
};
