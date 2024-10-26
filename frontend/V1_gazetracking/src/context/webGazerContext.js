// Context/WebGazerContext.js
import React, { createContext, useEffect, useState } from "react";
import { initWebGazer } from "../utils/webGazerSingleton";

const WebGazerContext = createContext();

export const WebGazerProvider = ({ children }) => {
  const [webGazer, setWebGazer] = useState(null);
  const [isWebGazerReady, setIsWebGazerReady] = useState(false);

  useEffect(() => {
    const initializeWebGazer = async () => {
      const instance = await initWebGazer();
      setWebGazer(instance);
      setIsWebGazerReady(true);
    };

    initializeWebGazer();

    return () => {
      if (webGazer) {
        webGazer.end();
      }
    };
  }, []);

  return (
    <WebGazerContext.Provider value={{ webGazer, isWebGazerReady }}>
      {children}
    </WebGazerContext.Provider>
  );
};

export const useWebGazer = () => React.useContext(WebGazerContext);
