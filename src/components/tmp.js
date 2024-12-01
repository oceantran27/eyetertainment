import { useState, useEffect } from "react";

export default function HoverButton({ onClick, className, icon, style }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // Tỷ lệ tiến trình (0-100)

  useEffect(() => {
    let timer;
    if (isHovered) {
      // Đặt thời gian đếm ngược (1.5s = 1500ms)
      let elapsedTime = 0;
      timer = setInterval(() => {
        elapsedTime += 50; // Cập nhật tiến trình mỗi 50ms
        setProgress((elapsedTime / 1500) * 100); // Tính toán tỷ lệ tiến trình (0-100)

        if (elapsedTime >= 1500) {
          clearInterval(timer); // Dừng đếm ngược khi đã hoàn thành
          handleHoverActivate(); // Kích hoạt onClick sau khi đủ 1.5s
        }
      }, 50); // Thực hiện mỗi 50ms
    } else {
      clearInterval(timer); // Dừng khi hover ra ngoài
      setProgress(0); // Reset tiến trình khi hover ra ngoài
    }

    return () => clearInterval(timer); // Dọn dẹp khi component bị hủy
  }, [isHovered]);

  const handleHoverActivate = () => {
    onClick();
  };

  return (
    <div style={{ position: "relative", width: "200px", height: "50px" }}>
      <button
        onMouseEnter={() => setIsHovered(true)} // Khi hover vào
        onMouseLeave={() => setIsHovered(false)} // Khi hover ra ngoài
        onClick={onClick}
        style={{
          ...style,
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className={className}
      >
        {icon}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${progress}%`, // Hiển thị thanh tiến trình
            height: "5px",
            backgroundColor: "#FF9800", // Màu thanh tiến trình
            transition: "width 0.05s ease-out", // Hiệu ứng mượt mà cho thanh tiến trình
          }}
        />
      </button>
    </div>
  );
}
