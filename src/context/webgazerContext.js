// Context/WebGazerContext.js
import React, { createContext, useEffect, useState } from 'react';
import { initWebGazer } from '../utils/webgazerSingleton';

const WebGazerContext = createContext();

export const WebGazerProvider = ({ children }) => {
  const [webgazer, setWebGazer] = useState(null);
  const [isWebgazerReady, setIsWebgazerReady] = useState(false); // Add a ready state

  useEffect(() => {
    const initializeWebGazer = async () => {
      const instance = await initWebGazer();
      setWebGazer(instance);

      setIsWebgazerReady(true); // Set ready after initialization

    };

    initializeWebGazer();

    return () => {
      // Cleanup if necessary
      if (webgazer) {
        webgazer.end();
      }
    };
  }, []);

  return (
    <WebGazerContext.Provider value={{ webgazer, isWebgazerReady}}>
      {children}
    </WebGazerContext.Provider>
  );
};

export const useWebGazer = () => React.useContext(WebGazerContext);