import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  
  console.log("test")
  return (
    <View style={styles.container}>
      <View style={styles.copornot}>
        <Text style={styles.textcop}>HELLLO</Text>
      </View>
      <View style={styles.logs}>
        <Text style={styles.textlog}>hai guys</Text>
      </View>
    </View>
    
  );
};

const baseView = {
  flex: 1,
  padding: 20,
  borderRadius: 10,
  margin: 10,
  width: '90%',
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  copornot:{
    ...baseView,
    marginBottom: '2.5%',
  },
  logs:{
    ...baseView,
    marginTop: '2.5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  text:{
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  }
});

export default App;
