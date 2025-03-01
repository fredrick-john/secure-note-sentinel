
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7b823fdb837145cb90fb9a2acc40d5c9',
  appName: 'secure-note-sentinel',
  webDir: 'dist',
  server: {
    url: 'https://7b823fdb-8371-45cb-90fb-9a2acc40d5c9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
    }
  }
};

export default config;
