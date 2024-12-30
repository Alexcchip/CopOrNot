import React, {useEffect, useState} from 'react'
import CText from '../components/CText'

import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import TestIcon from '../components/TestIcon'
import {View, StyleSheet, StatusBar} from 'react-native'

type Station = {
    lat: number;
    lon: number;
    station: string;
    trains: string | number;
    _id: string;
  };

export default function Header() {
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
      }
    });
    console.log(closestStation?.station + " " + closestStation?.trains)
    return (
    
        <View style={styles.headerContainer}>
          <View style={styles.whiteStripe} />
          <CText style={styles.headerText}>{closestStation?.station}          <TestIcon width={50} height={50} /></CText>
          <StatusBar translucent backgroundColor="transparent" />
          
        </View>
    );
    
}