import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CText from '../components/CText'
import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import TestIcon from '../components/TestIcon'
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
    const [flexValue, setFlexValue] = useState(1);
    // Find the closest station when the location changes
    useEffect(() => {
      if (location) {
        const { closestStation } = getClosestStation(location.coords.latitude, location.coords.longitude);
        setClosestStation(closestStation);
      }
    }, [location, stations]); // Recalculate if location or stations change
  const handlePress = () => {
    setFlexValue(flexValue === 1 ? 3: 1)
  };
  console.log(closestStation?.station + " " + closestStation?.trains)
  console.log("check");
  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.whiteStripe} />
          <CText style={styles.headerText}>{closestStation?.station}          <TestIcon width={50} height={50} /></CText>
            
        </View>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>

        <TouchableOpacity style={{flex: 1}} onPress={handlePress}>
          <View style={styles.cop}>
            <View style={styles.whiteStripe} />
              <CText style={styles.copOrNotText}>Cop</CText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={handlePress}>
          <View style={styles.not}>
            <View style={styles.whiteStripe} />
            <CText style={styles.copOrNotText}>Not</CText>
          </View>
        </TouchableOpacity>
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
