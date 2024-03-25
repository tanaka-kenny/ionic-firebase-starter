import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    }
  },
  appId: 'biz.pacifish',
  appName: 'quizQuest',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
