import React from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import CText from '../components/CText'

const App = () => {
  console.log("home page");

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>
        <View style={styles.cop}>
          <View style={styles.whiteStripe} />
          <CText style={styles.copOrNotText}>Cop</CText>
        </View>
        <View style={styles.not}>
          <View style={styles.whiteStripe} />
          <CText style={styles.copOrNotText}>Not</CText>
        </View>
      </View>

      {/* Logs Section */}
      <View style={styles.logsContainer}>
        <CText style={styles.logsText}>Logs</CText>
      </View>
    </View>
  );
};

// Base Style for Consistency
const baseViewStyle = {
  position: 'relative',
  borderRadius: 10,
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
};

// StyleSheet
const styles = StyleSheet.create({
  whiteStripe:{
    position: 'absolute',
    top: 40,
    width: '100%',
    height: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#261C2E',
  },
  copOrNotContainer: {
    ...baseViewStyle,
    flex: 3,
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '2.5%',
    backgroundColor: 'transparent', // Override background for parent container
  },
  cop: {
    ...baseViewStyle,
    flex: 1,
    backgroundColor: '#ED4D4D',
    height: '100%',
    marginRight: '5%',
  },
  not: {
    flex: 1,
    ...baseViewStyle,
    backgroundColor: '#6DC35E',
    height: '100%',
    marginLeft: '5%',
  },
  copOrNotText: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
  },
  logsContainer: {
    ...baseViewStyle,
    flex: 4,
    marginTop: '2.5%',
    marginBottom: '5%',
    backgroundColor: '#191521',
  },
  logsText: {
    fontSize: 56,
    color: 'white',
  },
});

export default App;
