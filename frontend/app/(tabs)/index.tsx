import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CText from '../components/CText'

const App = () => {
  console.log("home page");

  return (
    <View style={styles.container}>
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>
        <View style={styles.cop}>
          <CText style={styles.copOrNotText}>Cop</CText>
        </View>
        <View style={styles.not}>
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
  flex: 1,
  borderRadius: 10,
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#261C2E',
  },
  copOrNotContainer: {
    ...baseViewStyle,
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '2.5%',
    backgroundColor: 'transparent', // Override background for parent container
  },
  cop: {
    ...baseViewStyle,
    backgroundColor: '#ED4D4D',
    height: '100%',
    marginRight: '2.5%',
  },
  not: {
    ...baseViewStyle,
    backgroundColor: '#6DC35E',
    height: '100%',
    marginLeft: '2.5%',
  },
  copOrNotText: {
    fontSize: 56,
    color: 'white',
    textAlign: 'center',
  },
  logsContainer: {
    ...baseViewStyle,
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
