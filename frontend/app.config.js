import 'dotenv/config';

export default {
  expo: {
    extra: {
      eas: {
        projectId: "79fa33a9-f9ab-4eb5-853b-b9bc83aaeae3"
      }
    },
    "updates": {
      "url": "https://u.expo.dev/79fa33a9-f9ab-4eb5-853b-b9bc83aaeae3"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    name: "CopOrNot",
    slug: "copornot",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      //bundleIdentifier: "com.copo.rnot",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We needa see what station you by",
        "UIBackgroundModes": ["location", "fetch"]
      }
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      "permissions": ["ACCESS_FINE_LOCATION"],
      "useNextNotificationsApi": true
    },    
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-font",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    
  },
};
