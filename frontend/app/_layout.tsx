import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';

// Set global font family
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = {
  fontFamily: 'Helvetica', // Global font
};

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitleStyle: { fontWeight: "bold" },
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
