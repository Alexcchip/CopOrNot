import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  
  console.log("test")
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#261C2E',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
