let webgazerInstance;

const initWebGazer = async () => {
  if (!webgazerInstance) {
    const webgazerModule = await import('webgazer');
    webgazerInstance = webgazerModule.default;

    await webgazerInstance.setRegression('ridge').begin();
    console.log("WebGazer has started.");

  }

  return webgazerInstance;
};

const endWebGazer = () => {
  if (webgazerInstance) {
    webgazerInstance.end();
    webgazerInstance = null; // Reset the instance
    console.log("WebGazer has ended.");
  }
};

export { initWebGazer, endWebGazer };