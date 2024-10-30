"use client";

import { useEffect, useState } from "react";
import WebGazer from "webgazer";

export default function Home() {
  const [isCalibrating, setCalibrating] = useState(true);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [calibrationPoints, setCalibrationPoints] = useState([]);
  const [clickCounts, setClickCounts] = useState(Array(9).fill(0));

  useEffect(() => {
    const isCalibrationDone = localStorage.getItem("webgazerCalibrationDone");

    
    if (!isCalibrationDone) {
      //WebGazer.saveDataAcrossSessions = true;
    setCalibrationPoints([
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.9, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.9 },
      { x: window.innerWidth * 0.9, y: window.innerHeight * 0.9 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.9 },
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.9, y: window.innerHeight * 0.5 },
    ]);
    console.log("WebGazer loaded");

    //test
    const gazeListener = (data) => {
      if (data) {
        console.log(data);
      }
      else console.log("no data?")
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
      // WebGazer.recordScreenPosition(
      //   calibrationPoints[pointIndex].x,
      //   calibrationPoints[pointIndex].y,
      //   "click"
      // );
      // WebGazer.params.storingPoints = true;
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
      calculateAccuracy();
    } else {
      setCalibrationStep(
        (prevStep) => (prevStep + 1) % calibrationPoints.length
      );
    }
  };

  const calculateAccuracy = () => {
    const past50Points = WebGazer.getStoredPoints();
    const accuracy = calculatePrecision(past50Points);
    alert(`Độ chính xác của bạn là ${accuracy}%`);
  };

  if (!isCalibrating) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h1>Hello?</h1>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Calibration</h1>
      <h2>Hãy click vào điểm hiển thị ít nhất 5 lần mỗi điểm</h2>
      {calibrationPoints.map((point, index) => (
        <button
          key={index}
          style={{
            position: "absolute",
            left: point.x,
            top: point.y,
            width: 50,
            height: 50,
            backgroundColor: clickCounts[index] < 5 ? "red" : "yellow",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => handleCalibrationClick(index)}
        >
          {index + 1}
        </button>
      ))}
      {/* {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />} */}
    </div>
  );
}

function calculatePrecision(points) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  let totalPrecision = 0;
  points.forEach(({ x, y }) => {
    const distance = Math.sqrt(
      Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2)
    );
    const precision = Math.max(0, 100 - (distance / (windowHeight / 2)) * 100);
    totalPrecision += precision;
  });

  return Math.round(totalPrecision / points.length);
}

// "use client";

// import { useEffect, useState } from "react";
// import WebGazer from "webgazer";
// import Popup from "./components/Popup";

// export default function Home() {
//   const [isPopupVisible, setPopupVisible] = useState(true);
//   const [isCalibrating, setCalibrating] = useState(true);
//   const [calibrationStep, setCalibrationStep] = useState(0);
//   const [calibrationPoints, setCalibrationPoints] = useState([]);
//   const [clickCounts, setClickCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setCalibrationPoints([
//         { x: window.innerWidth * 0, y: window.innerHeight * 0.75 },
//         { x: window.innerWidth * 0, y: window.innerHeight * 0.25 },
//         { x: window.innerWidth * 0.25, y: window.innerHeight * 0 },
//         { x: window.innerWidth * 0.75, y: window.innerHeight * 0 },
//         { x: window.innerWidth * 0.95, y: window.innerHeight * 0.25 },
//         { x: window.innerWidth * 0.95, y: window.innerHeight * 0.75 },
//         { x: window.innerWidth * 0.75, y: window.innerHeight * 0.93 },
//         { x: window.innerWidth * 0.25, y: window.innerHeight * 0.93 },
//       ]);

//       WebGazer.setGazeListener((data) => {
//         if (data && !isCalibrating) {
//           const { x, y } = data;
//           if (y > window.innerHeight * 0.8) {
//             setPopupVisible(false);
//           }
//         }
//       })
//         .saveDataAcrossSessions(true) // Enable saving data for future sessions
//         .applyKalmanFilter(true) // Apply Kalman Filter for smoother tracking
//         .showVideo(false)
//         .begin();

//       // Run calibration process
//       // runCalibrationPoints();

//       return () => {
//         WebGazer.end();
//       };
//     }
//   }, [isCalibrating]);

//   const handleCalibrationClick = (point) => {
//     if (clickCounts[point] < 5) {
//       WebGazer.recordScreenPosition(
//         calibrationPoints[point].x,
//         calibrationPoints[point].y,
//         "click"
//       );
//       setClickCounts((prevCounts) => ({
//         ...prevCounts,
//         [point]: prevCounts[point] + 1,
//       }));
//     }

//     if (Object.values(clickCounts).every((count) => count >= 5)) {
//       setCalibrating(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20%" }}>
//       <h1>Click vào mỗi điểm ít nhất 5 lần</h1>
//       <h2>*Lưu ý: Không chớp mắt trong quá trình click</h2>
//       {calibrationPoints.map((point, index) => (
//         <button
//           key={index}
//           style={{
//             position: "absolute",
//             left: point.x,
//             top: point.y,
//             width: 50,
//             height: 50,
//             backgroundColor: clickCounts[index] < 5 ? "red" : "yellow",
//             border: "none",
//             borderRadius: "50%",
//             cursor: "pointer",
//           }}
//           onClick={() => handleCalibrationClick(index)}
//         >
//           {index + 1}
//         </button>
//       ))}
//       {/* {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />} */}
//     </div>
//   );
// }"
