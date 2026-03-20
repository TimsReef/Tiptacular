import cv from "@techstark/opencv-js"

let cvReady=false;
window.cv = cv

// Wait until OpenCV runtime is ready
cv.onRuntimeInitialized = () => {
  logScan("OpenCV ready");
  cvReady=true;
}