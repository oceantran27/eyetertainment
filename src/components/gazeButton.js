import { useState, useEffect } from "react";

export default function GazeButton({ onClick, className, icon, style }) {
  const [isHovered, setIsHovered] = useState(false);
  //   const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => {
        handleHoverActivate();
      }, 1500);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isHovered]);

  const handleHoverActivate = () => {
    // setIsTriggered(true);
    onClick();
  };

  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={className}
      >
        {icon}
      </button>
    </div>
  );
}
