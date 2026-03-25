import { App } from '@capacitor/app';

// In Capacitor 8, the global Capacitor object is already injected by the native bridge.
// We must check for its existence and then register the plugin.
if (window.Capacitor) {
  // Register App in the standard Plugins registry (Recommended)
  window.Capacitor.Plugins.App = App;
}