import type { CapacitorConfig } from '@capacitor/cli';
import { App } from '@capacitor/app';

const config: CapacitorConfig = {
  appId: 'com.tiptacular.app',
  appName: 'Tiptacular',
  webDir: 'www',
  backgroundColor: '#ffffff', // Sets the default background color
  android: {
    backgroundColor: 'transparent'
  },
  ios: {
    backgroundColor: 'transparent'
  }
};

export default config;
