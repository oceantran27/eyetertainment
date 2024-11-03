"use client";

import { useEffect, useState } from "react";
import WebGazer from "webgazer";
import localforage from "localforage";

export default function Home() {
  const [isCalibrating, setCalibrating] = useState(true);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [calibrationPoints, setCalibrationPoints] = useState([]);
  const [clickCounts, setClickCounts] = useState(Array(9).fill(0));

  useEffect(() => {
    const isCalibrationDone = localStorage.getItem("webgazerCalibrationDone");
    console.log(isCalibrationDone);
    if (!isCalibrationDone) {
      //WebGazer.saveDataAcrossSessions = true;
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
      console.log("WebGazer loaded");

      //test
      const gazeListener = (data) => {
        if (data) {
          console.log(data);
        } else console.log("no data?");
      };

      WebGazer.setRegression("ridge")
        .setGazeListener((data, clock) => {}) //test
        .saveDataAcrossSessions(true)
        .applyKalmanFilter(true)
        .showPredictionPoints(true)
        .showVideoPreview(false)
        .begin();

      window.saveDataAcrossSessions = true;
    } else {
      async function getCalibrationData() {
        try {
          const data = await localforage.getItem("webgazerGlobalData");
          console.log("Calibration data:", data);
        } catch (error) {
          console.error("Error retrieving data:", error);
        }
      }
      getCalibrationData();
      console.log("Calibration already completed. Skipping calibration steps.");
      WebGazer.setRegression("ridge")
        .setGazeListener((data, clock) => {})
        .saveDataAcrossSessions(true)
        .applyKalmanFilter(true)
        .showPredictionPoints(true)
        .showVideoPreview(false)
        .begin();
    }

    return () => {
      WebGazer.end();
    };
  }, [isCalibrating]);

  const handleCalibrationClick = (pointIndex) => {
    if (clickCounts[pointIndex] < 5) {
      setClickCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[pointIndex] += 1;
        return newCounts;
      });
    }

    if (clickCounts.every((count) => count >= 5)) {
      console.log("Calibration completed");
      setCalibrating(false);
      localStorage.setItem("webgazerCalibrationDone", "true"); // Save the calibration completion flag
    } else {
      setCalibrationStep(
        (prevStep) => (prevStep + 1) % calibrationPoints.length
      );
    }
  };

  if (!isCalibrating) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h1>Hello?</h1>
      </div>
    );
  }

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
            backgroundColor: clickCounts[index] < 5 ? "Blue" : "yellow",
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
