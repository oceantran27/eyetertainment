import localforage from "localforage";
import { useEffect } from "react";
import router from "next/router";

const webGazerSettings = async (webgazerInstance) => {
  webgazerInstance.setRegression("ridge");
  webgazerInstance.setTracker("TFFaceMesh");
  webgazerInstance.saveDataAcrossSessions(true);
  webgazerInstance.setCameraConstraints({
    video: {
      width: {
        min: 320,
        ideal: 1280,
        max: 1920,
      },
      height: {
        min: 240,
        ideal: 720,
        max: 1080,
      },
      facingMode: "user",
      frameRate: { ideal: 30, max: 60 },
    },
  });

  // const videoCanvas = webgazerInstance.getVideoElementCanvas();
  // if (videoCanvas) {
  //   videoCanvas.width = 640;
  //   videoCanvas.height = 480;
  //   webgazerInstance.setVideoElementCanvas(videoCanvas);
  // }

  await webgazerInstance.showVideoPreview(false);
  await webgazerInstance.showFaceOverlay(false);
  await webgazerInstance.showFaceFeedbackBox(false);
  webgazerInstance.showPredictionPoints(true);
  webgazerInstance.applyKalmanFilter(true);

  return webgazerInstance;
};

const loadWebGazer = async () => {
  if (typeof window !== "undefined") {
    const webgazerModule = await import("webgazer");
    const webgazer = webgazerModule.default || webgazerModule;
    await webGazerSettings(webgazer);
    window.webgazer = webgazer;
    return webgazer;
  }
  return null;
};

const useWebGazer = (onGazeData = {}, options = {}) => {
  const CALIBRATION_DATA_KEY = "webgazerGlobalData";

  useEffect(() => {
    let webgazerInstance = null;

    const initializeWebGazer = async () => {
      webgazerInstance = await loadWebGazer();
      console.log("webgazerInstance", webgazerInstance);
      const data = await localforage.getItem(CALIBRATION_DATA_KEY); //PUT
      console.log("data", data);
      const hasCalibrationData = data && data.length > 0;
      console.log("hasCalibrationData", hasCalibrationData);

      if (webgazerInstance) {
        await webgazerInstance.begin();

        if (!hasCalibrationData) {
          router.push("/calibration");
          return;
        }

        console.log("WebGazer is starting...");
      } else {
        console.error("WebGazer is not available!");
      }
    };

    initializeWebGazer();

    // Cleanup khi component unmount
    return () => {
      if (webgazerInstance) {
        webgazerInstance.end();
      }
    };
  }, [onGazeData, options]);
};

export default useWebGazer;
