import useWebGazer from "@/hooks/useWebGazer";
import { useState, useEffect } from "react";

export default function InteractiveCards() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardColors, setCardColors] = useState(["lightgray", "lightgray"]);
  const hoverDuration = 2000;
  let hoverStart = null;

  useWebGazer((data) => {
    if (!data) return;

    const { x, y } = data;
    const card1 = document.getElementById("card-1").getBoundingClientRect();
    const card2 = document.getElementById("card-2").getBoundingClientRect();

    if (
      x >= card1.left &&
      x <= card1.right &&
      y >= card1.top &&
      y <= card1.bottom
    ) {
      setHoveredCard(0);
    } else if (
      x >= card2.left &&
      x <= card2.right &&
      y >= card2.top &&
      y <= card2.bottom
    ) {
      setHoveredCard(1);
    } else {
      setHoveredCard(null);
      hoverStart = null;
    }
  });

  useEffect(() => {
    if (hoveredCard !== null) {
      if (hoverStart === null) {
        hoverStart = Date.now();
      }

      const duration = Date.now() - hoverStart;
      if (duration >= hoverDuration) {
        setCardColors((prevColors) =>
          prevColors.map((color, index) =>
            index === hoveredCard ? "lightblue" : color
          )
        );
        hoverStart = null;
      }
    } else {
      hoverStart = null;
    }
  }, [hoveredCard]);

  const handleClick = (index) => {
    setCardColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? "lightgreen" : color))
    );
  };

  return (
    <div className="flex items-center justify-around h-screen">
      <div
        id="card-1"
        className="w-64 h-64 rounded-lg shadow-lg cursor-pointer"
        style={{ backgroundColor: cardColors[0] }}
        onClick={() => handleClick(0)}
      >
        <h2 className="text-center pt-24">Card 1</h2>
      </div>
      <div
        id="card-2"
        className="w-64 h-64 rounded-lg shadow-lg cursor-pointer"
        style={{ backgroundColor: cardColors[1] }}
        onClick={() => handleClick(1)}
      >
        <h2 className="text-center pt-24">Card 2</h2>
      </div>
    </div>
  );
}
