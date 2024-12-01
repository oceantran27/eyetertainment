import { useState, useEffect } from "react";

export default function HoverButton({ onClick, className, icon, style }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isHovered) {
      let elapsedTime = 0;
      timer = setInterval(() => {
        elapsedTime += 50;
        setProgress((elapsedTime / 1500) * 100);

        if (elapsedTime >= 1500) {
          clearInterval(timer);
          handleHoverActivate();
        }
      }, 50);
    } else {
      clearInterval(timer);
      setProgress(0);
    }

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleHoverActivate = () => {
    onClick();
  };

  return (
    <div style={{ position: "relative", width: "200px", height: "50px" }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            width: `${progress}%`,
            height: "5px",
            backgroundColor: "#adc6ff",
            transition: "width 0.05s ease-out",
          }}
        />
      </button>
    </div>
  );
}
