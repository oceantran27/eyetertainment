import "@/styles/global.css";
import { useState, useEffect } from "react";
import useWebGazer from "@/hooks/useWebGazer";

function MyApp({ Component, pageProps }) {
  const [gazeData, setGazeData] = useState(null);

  useWebGazer((data) => {
    if (data) {
      setGazeData(data);
    }
  });

  return <Component {...pageProps} gazeData={gazeData} />;
}

export default MyApp;
