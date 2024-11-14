import { useState } from "react";

const Calibration = () => {
  const [calibrationCount, setCalibrationCount] = useState(0);

  const handleCalibrationClick = () => {
    if (typeof window.webgazer !== "undefined") {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      window.webgazer.recordScreenPosition(x, y);
      setCalibrationCount(calibrationCount + 1);
      console.log(`Calibrated tại: X=${x}, Y=${y}`);

      if (calibrationCount >= 4) {
        alert("Hiệu chuẩn hoàn tất!");
      }
    }
  };

  return (
    <div className="flex items-center">
      <h2>Nhấn vào màn hình để hiệu chuẩn.</h2>
      <button onClick={handleCalibrationClick}>
        Hiệu chuẩn ({calibrationCount}/5)
      </button>
    </div>
  );
};

export default Calibration;
