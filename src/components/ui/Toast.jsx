import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

let toastId = 0;
const listeners = new Set();

export const showToast = (message, duration = 2800) => {
  const id = ++toastId;
  listeners.forEach((fn) => fn({ id, message }));
  setTimeout(() => {
    listeners.forEach((fn) => fn({ id, message: null }));
  }, duration);
};

const ToastHost = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (payload) => {
      if (payload.message) setToast(payload);
      else setToast(null);
    };
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  if (!toast?.message) return null;

  return createPortal(
    <div className="fb-toast-container" aria-live="polite">
      <div className="fb-toast" key={toast.id}>
        {toast.message}
      </div>
    </div>,
    document.body
  );
};

export default ToastHost;
