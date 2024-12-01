import React from "react";
import { useGazeData } from "@/hooks/GazeContext";
import HoverButton from "@/components/tmp";

function DisplayGaze() {
  const gazeData = useGazeData();

  return (
    <div>
      <HoverButton />
    </div>
  );
}

export default DisplayGaze;
