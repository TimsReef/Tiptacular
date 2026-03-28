let cvDebugEnabled=false;

// -----------------------------
// Receipt Scanner Logging
// -----------------------------

let scannerLogs=[];

// Structured scanner telemetry logger

function logScan(step,status="info",metrics={}){
 const entry={
  t:Date.now(),
  step:String(step),
  status:String(status),
  metrics:dataToString(metrics)
 };
 scannerLogs.push(entry);
}

function logClear() {
  scannerLogs=[];
  logScan("Logs Cleared");
}