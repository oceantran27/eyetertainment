// components/Popup.js
import { useEffect } from "react";

const Popup = ({ onClose }) => {
  useEffect(() => {
    // Thêm event listener cho việc theo dõi hướng nhìn
    const handleGaze = (data) => {
      // Kiểm tra nếu người dùng nhìn xuống
      if (data && data.y > window.innerHeight / 2) {
        onClose(); // Tắt popup khi người dùng nhìn xuống
      }
    };

    window.addEventListener("gaze", handleGaze);

    return () => {
      window.removeEventListener("gaze", handleGaze);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <h2>Welcome!</h2>
      <p>Look down to close this popup.</p>
      <style jsx>{`
        .popup {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default Popup;
