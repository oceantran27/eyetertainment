"use client";

import { useEffect, useState, useRef } from "react";
import WebGazer from "webgazer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 });
  const [currentCard, setCurrentCard] = useState(null);
  const cardRefs = useRef([]);
  const gazeOnCardStart = useRef(null);

  // Keep track of clicked cards (both mouse and gaze)
  const [clickedCard, setClickedCard] = useState(null);

  useEffect(() => {
    WebGazer.setRegression("ridge")
      .setGazeListener((data) => {
        if (data) {
          handleGaze(data);
        }
      })
      .begin();

    return () => {
      WebGazer.end(); // Clean up the gaze tracking when the component is unmounted
    };
  }, []);

  // Handle gaze event (tracking which card is being looked at)
  const handleGaze = (data) => {
    const gazeX = data.x;
    const gazeY = data.y;

    // Update gaze position for the progress indicator
    setGazePosition({ x: gazeX, y: gazeY });

    let gazeOnCard = false;

    // Check if gaze is on any of the cards
    cardRefs.current.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      if (
        gazeX >= cardRect.left &&
        gazeX <= cardRect.right &&
        gazeY >= cardRect.top &&
        gazeY <= cardRect.bottom
      ) {
        gazeOnCard = true;
        setCurrentCard(index);
        if (!gazeOnCardStart.current) {
          gazeOnCardStart.current = Date.now();
        }
      }
    });

    if (!gazeOnCard) {
      gazeOnCardStart.current = null;
      setProgress(0);
      setCurrentCard(null);
    } else {
      const elapsedTime = Date.now() - gazeOnCardStart.current;
      const newProgress = Math.min(Math.floor(elapsedTime / 100) * 10, 100);
      setProgress(newProgress);

      if (newProgress >= 100 && clickedCard === null) {
        // If gaze reaches 100% and the card is not already clicked, click it
        handleCardClick(currentCard, "gaze");
        gazeOnCardStart.current = null; // Reset gaze time
        setProgress(0); // Reset progress
      }
    }
  };

  // Handle card click (both mouse and gaze)
  const handleCardClick = (index, source) => {
    if (clickedCard !== null) {
      // If the card is already clicked (either mouse or gaze), do nothing
      return;
    }

    // Mark the card as clicked
    setClickedCard(index);

    // Log which method triggered the click
    if (source === "gaze") {
      console.log(`Card ${index + 1} clicked by gaze!`);
    } else {
      console.log(`Card ${index + 1} clicked with mouse!`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15%" }}>
      <h1 style={{ color: "red" }}>Eye Tracking Cards</h1>

      <div
        id="gaze"
        className="absolute w-24 h-24 rounded-full border-2 border-opacity-20 shadow-lg text-center pointer-events-none z-50"
        style={{
          display: currentCard !== null ? "block" : "none",
          left: gazePosition.x - 12, // Adjust for half the width of the circle
          top: gazePosition.y - 12, // Adjust for half the height of the circle
        }}
      >
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "turquoise",
            trailColor: "blue-100",
          })}
        />
      </div>

      <div className="flex flex-row gap-10 pt-20">
        {/* Card 1 */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={`py-4 h-[350px] w-2/5 cursor-pointer ${
            clickedCard === 0 ? "bg-green-500" : "bg-orange-300"
          }`} // Change color if clicked
          onClick={() => handleCardClick(0, "mouse")} // Mouse click handler
        >
          <h4 className="font-bold text-large">Card 1: Quiz</h4>
        </div>

        {/* Card 2 */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={`py-4 h-[350px] w-2/5 cursor-pointer ${
            clickedCard === 1 ? "bg-green-500" : "bg-violet-300"
          }`} // Change color if clicked
          onClick={() => handleCardClick(1, "mouse")} // Mouse click handler
        >
          <h4 className="font-bold text-large">Card 2: Reading</h4>
        </div>
      </div>
    </div>
  );
}
