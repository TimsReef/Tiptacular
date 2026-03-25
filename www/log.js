let cvDebugEnabled=false;

// -----------------------------
// Receipt Scanner Logging
// -----------------------------

const scannerLogs=[];

// Structured scanner telemetry logger

function logScan(step,status="info",metrics={}){
 const entry={
  t:Date.now(),
  step:String(step),
  status:String(status),
  ...metrics
 };
 scannerLogs.push(entry);
}