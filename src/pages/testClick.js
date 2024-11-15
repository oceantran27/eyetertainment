import { useEffect, useState } from "react";
import {
  resumeWebGazer,
  pauseWebGazer,
  setGazeListenerCallback,
} from "@/components/webGazerWrapper";

const FocusCard = () => {
  const [isLooking, setIsLooking] = useState(false);
  const [cardColor, setCardColor] = useState("lightblue");

  const cardPosition = {
    x: window.innerWidth / 2 - 100,
    y: window.innerHeight / 2 - 50,
    width: 200,
    height: 100,
  };

  useEffect(() => {
    resumeWebGazer();

    setGazeListenerCallback((gazeData) => {
      if (gazeData && gazeData.x !== null && gazeData.y !== null) {
        const { x, y } = gazeData;

        if (
          x > cardPosition.x &&
          x < cardPosition.x + cardPosition.width &&
          y > cardPosition.y &&
          y < cardPosition.y + cardPosition.height
        ) {
          setIsLooking(true);
        } else {
          setIsLooking(false);
        }
      } else {
        setIsLooking(false);
      }
    });

    return () => {
      pauseWebGazer();
    };
  }, []);

  useEffect(() => {
    if (isLooking) {
      setCardColor("lightgreen");
    } else {
      setCardColor("lightblue");
    }
  }, [isLooking]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: cardPosition.width,
          height: cardPosition.height,
          backgroundColor: cardColor,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          transition: "background-color 0.3s ease",
        }}
      >
        Look Here
      </div>
    </div>
  );
};

export default FocusCard;
