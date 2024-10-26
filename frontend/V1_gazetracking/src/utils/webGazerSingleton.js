let webGazerInstance;

const initWebGazer = async () => {
  if (!webGazerInstance) {
    const webGazerModule = await import("webGazer");
    webGazerInstance = webGazerModule.default;

    await webGazerInstance.setRegression("ridge").begin();
    console.log("WebGazer has started.");
  }

  return webGazerInstance;
};

const endWebGazer = () => {
  if (webGazerInstance) {
    webGazerInstance.end();
    webGazerInstance = null; // Reset the instance
    console.log("WebGazer has ended.");
  }
};

export { initWebGazer, endWebGazer };
