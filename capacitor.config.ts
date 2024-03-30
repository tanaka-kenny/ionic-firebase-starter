import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    }
  },
  appId: 'biz.pacifish.ionic.starter', // TODO: Replace with your appId
  appName: 'ionic-starter', // TODO: Replace with your appName
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
