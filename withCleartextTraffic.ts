import {
    ConfigPlugin,
    withAndroidManifest,
    AndroidConfig,
  } from '@expo/config-plugins';
  
  const withCleartextTraffic: ConfigPlugin = (config) => {
    return withAndroidManifest(config, async (config) => {
      const androidManifest = config.modResults;
      
      // Locate the <application> tag in AndroidManifest.xml
      const application = AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  
      // Add the android:usesCleartextTraffic="true" if it's not already added
      if (!application.$['android:usesCleartextTraffic']) {
        application.$['android:usesCleartextTraffic'] = 'true';
      }
  
      return config;
    });
  };
  
  export default withCleartextTraffic;
  