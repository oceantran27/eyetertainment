import React from "react";
import { useGazeData } from "@/hooks/GazeContext";

function DisplayGaze() {
  const gazeData = useGazeData();

  return (
    <div>
      <h1>Gaze Data</h1>
      {gazeData ? (
        <ul>
          <li>GazeX: {gazeData.GazeX}</li>
          <li>GazeY: {gazeData.GazeY}</li>
        </ul>
      ) : (
        <p>No gaze data available</p>
      )}
    </div>
  );
}

export default DisplayGaze;
