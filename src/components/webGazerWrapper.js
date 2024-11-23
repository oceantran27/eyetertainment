import localforage from "localforage";
import { useEffect } from "react";
import { useRouter } from "next/router";

let webgazerInstance = null;

const WebGazerWrapper = ({ children }) => {
  const router = useRouter();

  const webGazerSettings = async (webgazerInstance) => {
    await webgazerInstance.showVideoPreview(false);
    await webgazerInstance.showFaceOverlay(false);
    await webgazerInstance.showFaceFeedbackBox(false);
    webgazerInstance.setRegression("ridge");
    webgazerInstance.setTracker("clmtrackr");
    webgazerInstance.saveDataAcrossSessions(true);
    webgazerInstance.setCameraConstraints({
      video: {
        width: { min: 320, ideal: 1280, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 },
        facingMode: "user",
        frameRate: { ideal: 30, max: 60 },
      },
    });

    const videoElement = webgazerInstance.getVideoElementCanvas();

    if (videoElement) {
      const { videoWidth, videoHeight } = videoElement;
      const canvasWidth = videoWidth || 1280;
      const canvasHeight = videoHeight || 720;

      videoElement.width = canvasWidth;
      videoElement.height = canvasHeight;

      webgazerInstance.setVideoElementCanvas(videoElement);
    } else {
      console.warn("Video element is not available.");
    }

    webgazerInstance.showPredictionPoints(true);
    webgazerInstance.applyKalmanFilter(true);
  };

  const processNewUser = async () => {
    const CALIBRATION_DATA_KEY = "webgazerGlobalData";

    const data = await localforage.getItem(CALIBRATION_DATA_KEY); //PUT
    // console.log("data", data);
    const hasCalibrationData = data && data.length > 0;
    // console.log("hasCalibrationData", hasCalibrationData);

    if (!hasCalibrationData) {
      router.push("/calibration");
      console.log("Routing to calibration...");
      return;
    }
  };

  useEffect(() => {
    const initializeWebGazer = async () => {
      if (typeof window !== "undefined" && !webgazerInstance) {
        try {
          console.log("Initializing WebGazer...");

          const webgazer = await import("webgazer");
          window.webgazer = webgazer.default; // Gán vào window
          webgazerInstance = window.webgazer;
          await webGazerSettings(webgazerInstance);

          await webgazerInstance.begin();
          console.log("WebGazer has begun tracking");

          await processNewUser();
        } catch (error) {
          console.error("WebGazer initialization failed:", error);
        }
      } else {
        console.log("WebGazer already initialized or window is undefined.");
      }
    };

    initializeWebGazer();

    return () => {
      if (webgazerInstance) {
        console.log("Pausing WebGazer...");
        webgazerInstance.pause();
      }
    };
  }, []);

  return <>{children}</>;
};

export const resumeWebGazer = () => {
  if (window.webgazer) {
    console.log("Resuming WebGazer...");
    window.webgazer.resume();
  } else {
    console.warn("WebGazer instance is not initialized yet.");
  }
};

export const pauseWebGazer = () => {
  if (window.webgazer) {
    console.log("Pausing WebGazer...");
    window.webgazer.pause();
  } else {
    console.warn("WebGazer instance is not initialized yet.");
  }
};

export const setGazeListenerCallback = (callback) => {
  if (window.webgazer) {
    window.webgazer.setGazeListener(callback);
  } else {
    const checkWebGazerReady = setInterval(() => {
      if (window.webgazer) {
        window.webgazer.setGazeListener(callback);
        clearInterval(checkWebGazerReady);
      }
    }, 100);
  }
};

export default WebGazerWrapper;
