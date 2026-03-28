import cv from "@techstark/opencv-js"

// Initialize OpenCV and return the cv object
//export async function initializeOpenCV() {
//  let cvReady;
//  if (cv instanceof Promise) {
//    cvReady = await cv;
//  } else {
//    // Fallback for older versions or specific configurations
//    await new Promise((resolve) => {
//      cv.onRuntimeInitialized = () => resolve();
//    });
//    cvReady = cv;
//    window.cv = cv;
//  }
//  return cvReady;
//}


window.cv = cv

// Wait until OpenCV runtime is ready
cv.onRuntimeInitialized = () => {
  Console.log("OpenCV Ready");
}
