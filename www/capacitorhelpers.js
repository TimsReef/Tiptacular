// -----------------------------
// Capacitor Helpers
// -----------------------------

async function getAppVersion() {
  let version = "1.0.0.0"; // default version number

  try {
    if(window.Capacitor) {
      const info = await window.Capacitor.Plugins.App.getInfo();
      version = info.version;
    }
  } catch(e) {
    logScan("getAppVersion", "exception", e);
  }

  return version;
}
