// src/utils/gazeHelpers.js
export const smoothGazeData = (data, buffer, bufferSize = 10) => {
  buffer.push(data);
  if (buffer.length > bufferSize) buffer.shift();

  const avgX = buffer.reduce((sum, d) => sum + d.x, 0) / buffer.length;
  const avgY = buffer.reduce((sum, d) => sum + d.y, 0) / buffer.length;

  return { x: avgX, y: avgY };
};
