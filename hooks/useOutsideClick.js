import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a specified element and trigger a callback.
 *
 * @param {React.RefObject} ref - React ref pointing to the target element.
 * @param {Function} callback - Function to execute on an outside click.
 */
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    if (!ref || typeof callback !== "function") return;

    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
