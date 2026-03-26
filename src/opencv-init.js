import cv from "@techstark/opencv-js"

export let cvReady=false;
window.cv = cv

// Wait until OpenCV runtime is ready
cv.onRuntimeInitialized = () => {
  cvReady=true;
}
