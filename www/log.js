let cvDebugEnabled=false;

// -----------------------------
// Receipt Scanner Logging
// -----------------------------

const scannerLogs=[];

// Structured scanner telemetry logger
let scanFrameCounter=0;

function logScan(step,status="info",metrics={}){
 const entry={
  t:Date.now(),
  step:String(step),
  status:String(status),
  frame:scanFrameCounter,
  ...metrics
 };
 scannerLogs.push(entry);
}