import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import CText from '../components/CText'
import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import TestIcon from '../components/TestIcon'
import Header from '../components/Header'
import Log from '../components/Log'
import LogPreview from '../components/LogPreview'

const sampleLogs = [
  {timestamp: '12:41pm', entrance: 'Main Entrance', copOrNot: true},
  {timestamp: '12:40pm', entrance: 'Side Entrance', copOrNot: false},
  {timestamp: '12:33pm', entrance: 'Main Entrance', copOrNot: true},
  {timestamp: '12:05pm', entrance: 'Main Entrance', copOrNot: true},
  {timestamp: '11:59am', entrance: 'Side Entrance', copOrNot: false},
];

const Stats = () => {
  return (
    <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Logs Section */}
            <View style={styles.logsContainer}>
                <LogPreview logs={sampleLogs} />
            </View>
            <View style={styles.logsContainer}>
                <LogPreview logs={sampleLogs} />
            </View>
            <View style={styles.logsContainer}>
                <LogPreview logs={sampleLogs} />
            </View>
        </ScrollView>
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
  whiteStripe:{
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#261C2E',
  },
  scrollContent: {
    alignSelf: 'center',
    padding: 20, // Add padding for a better scroll experience
    width: '100%',
  },
  logsContainer: {
    ...baseViewStyle,
    flex: 4,
    marginTop: '2.5%',
    marginBottom: '5%',
    backgroundColor: '#191521',
    width: '100%',
  },
  logsText: {
    fontSize: 56,
    color: 'white',
  },
});



export default Stats;
