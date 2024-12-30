import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CText from '../components/CText'
import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import TestIcon from '../components/TestIcon'
import Header from '../components/Header'
const App = () => {
  const [isCopPressed, setIsCopPressed] = useState(false); // Track if the button was pressed
  const [isNotPressed, setIsNotPressed] = useState(false); // Track if the button was pressed
  const handleCopPress = () => {
    setIsCopPressed(true);
    setIsNotVisible(false);
  };
  const handleNotPress = () => {
    setIsNotPressed(true);
    setIsCopVisible(false);
  };

  const [isCopVisible, setIsCopVisible] = useState(true); // Track component visibility
  const [isNotVisible, setIsNotVisible] = useState(true); // Track component visibility

  return (
    <View style={styles.container}>
      <Header />
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>

        {isCopVisible && ( // Conditionally render the "Cop" button
          <TouchableOpacity
            style={[styles.cop, isCopPressed && styles.copPressed]}
            onPress={handleCopPress}
            disabled={isCopPressed}
          >
            <View style={styles.whiteStripe} />
            <Text style={styles.copOrNotText}>Cop</Text>
          </TouchableOpacity>
        )}

        {isNotVisible && ( // Conditionally render the "Not" button
          <TouchableOpacity
            style={[styles.not, isNotPressed && styles.notPressed]}
            onPress={handleNotPress}
            disabled={isNotPressed}
          >
            <View style={styles.whiteStripe} />
            <Text style={styles.copOrNotText}>Not</Text>
          </TouchableOpacity>
        )}
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
  headerContainer: {
    width: '100%',
    backgroundColor: "black",
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: "center",
  },
  headerText: {
    paddingTop: 10,
    color: "white",
    fontSize: 48,
  },
  copPressed:{
    backgroundColor: 'grey',
  },
  notPressed:{
    backgroundColor: 'grey',
  },
  whiteStripe:{
    position: 'absolute',
    top: 50,
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
