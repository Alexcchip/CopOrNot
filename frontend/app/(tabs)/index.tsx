import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CText from '../components/CText'
import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';

type Station = {
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
  _id: string;
};
const App = () => {

    const { stations, getClosestStation } = useStations(); // Access stations and getClosestStation
    const { location } = useLocation(); // Access the user's location
    const [closestStation, setClosestStation] = useState<Station | null>(null); // Explicitly define the type
    // Find the closest station when the location changes
    useEffect(() => {
      if (location) {
        const { closestStation } = getClosestStation(location.coords.latitude, location.coords.longitude);
        setClosestStation(closestStation);
      }
    }, [location, stations]); // Recalculate if location or stations change
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You clicked the button.');
  };
  console.log(closestStation?.station + " " + closestStation?.trains)

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>
        <TouchableOpacity style={styles.copOrNotContainer}>
          <View style={styles.cop}>
            <View style={styles.whiteStripe} />
              <CText style={styles.copOrNotText}>Cop</CText>
          </View>
        </TouchableOpacity>
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
