import { toast } from "react-toastify";

/**
 * Displays a success toast notification with the given message.
 *
 * @param {string} message - The message to display in the toast notification.
 * @param {number} [time] - The duration in milliseconds to display the toast notification. Defaults to 500.
 * @param {Object} [options] - Additional options for the toast notification.
 * @param {Function} [options.onClose] - Callback function to be called when the toast notification is closed.
 * @return {void}
 */

const Toast = {
  success: (message, time, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: time ? time : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: options.onClose,
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      ...options,
    });
  },
};

export default Toast;
