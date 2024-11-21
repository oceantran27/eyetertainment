// src/pages/calibration.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pauseWebGazer, resumeWebGazer } from "@/components/webGazerWrapper";

export default function Calibration() {
  const router = useRouter();
  const [calibrationPoints, setCalibrationPoints] = useState([]);
  const [clickCounts, setClickCounts] = useState(Array(9).fill(0));

  useEffect(() => {
    setCalibrationPoints([
      { x: window.innerWidth * 0, y: window.innerHeight * 0.83 },
      { x: window.innerWidth * 0, y: window.innerHeight * 0.46 },
      { x: window.innerWidth * 0, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0 },
      { x: window.innerWidth * 0.96, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.96, y: window.innerHeight * 0.46 },
      { x: window.innerWidth * 0.96, y: window.innerHeight * 0.83 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.93 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    ]);

    resumeWebGazer();
    return () => pauseWebGazer();
  }, []);

  const handleCalibrationClick = (pointIndex) => {
    if (clickCounts[pointIndex] < 5) {
      setClickCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[pointIndex] += 1;
        return newCounts;
      });
    }

    if (clickCounts.every((count) => count >= 5)) {
      router.push("/");
      console.log("Calibration completed");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <h1 style={{ color: "red" }}>CALIBRATION</h1>
        <h2>Hãy click vào điểm mục tiêu (màu xanh) ít nhất 5 lần mỗi điểm</h2>
        <h2>Chỉ click khi chấm đỏ nằm gần nhất với điểm mục tiêu</h2>
      </div>

      {calibrationPoints.map((point, index) => (
        <button
          key={index}
          style={{
            position: "absolute",
            left: point.x,
            top: point.y,
            width: 50,
            height: 50,
            backgroundColor: clickCounts[index] < 5 ? "green" : "yellow",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => handleCalibrationClick(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
