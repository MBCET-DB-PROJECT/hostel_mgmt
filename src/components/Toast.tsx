import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-${type}-500 text-white px-4 py-2 rounded bg-red-500`}
      style={{
        opacity: show ? "1" : "0",
        transition: "opacity 0.3s ease-in-out",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
