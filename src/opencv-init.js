import cv from "@techstark/opencv-js"

window.cv = cv

// Wait until OpenCV runtime is ready
cv.onRuntimeInitialized = () => {
  logScan("OpenCV ready");
}