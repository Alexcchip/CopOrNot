import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  console.log("home page");

  return (
    <View style={styles.container}>
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>
        <View style={styles.cop}>
          <Text style={styles.copOrNotText}>Cop</Text>
        </View>
        <View style={styles.not}>
          <Text style={styles.copOrNotText}>Not</Text>
        </View>
      </View>

      {/* Logs Section */}
      <View style={styles.logsContainer}>
        <Text style={styles.logsText}>Logs</Text>
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
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
