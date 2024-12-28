import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Helvetica': require('../assets/fonts/helvetica/Helvetica.ttf'),
    'Helvetica-Light': require('../assets/fonts/helvetica/Helvetica-Light.ttf'),
    'Helvetica-Bold': require('../assets/fonts/helvetica/Helvetica-Bold.ttf'),
    'Helvetica-Oblique': require('../assets/fonts/helvetica/Helvetica-Oblique.ttf'),
    'Helvetica-Bold-Oblique': require('../assets/fonts/helvetica/Helvetica-Bold-Oblique.ttf'),
    'Helvetica-Light-Oblique': require('../assets/fonts/helvetica/Helvetica-Light-Oblique.ttf'),
  });
  
  return (
    <View style={styles.container}><Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
          headerTitleStyle: { fontFamily: 'Helvetica-Bold', fontWeight: 'bold' },
          headerShown: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
