import React, {useEffect, useState} from 'react'
import CText from '../components/CText'

import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import {View, StyleSheet, StatusBar} from 'react-native'
import TrainIcon from '../components/TrainIcon'

type Station = {
    lat: number;
    lon: number;
    station: string;
    trains: string | number;
    _id: string;
};

type TrainLine = '1' | '2' | '3' | '4' | '5' | '6' | '7' |
                 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
                 'J' | 'L' | 'M' | 'N' | 'Q' | 'R' | 'S' | 'W' | 'Z' |
                 'SIR';


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
      },
      trainIconsContainer:{
        flexDirection: "row",
      }
    });
    //console.log(closestStation?.station + " " + closestStation?.trains)
    //console.log('Trains:', closestStation?.trains);
    return (
    
        <View style={styles.headerContainer}>
          <View style={styles.whiteStripe} />
          <CText style={styles.headerText}>{closestStation?.station}</CText>
          <View style={styles.trainIconsContainer}>
            {closestStation?.trains &&
              typeof closestStation.trains === 'string' &&
              closestStation.trains.split(' ').map((trainLine, index) =>{
                const trimmedTrainLine = trainLine?.trim();
                return trimmedTrainLine ? <TrainIcon key={index} trainLine={trimmedTrainLine} /> : null;
              }
              )
            }
          </View>
          <StatusBar translucent backgroundColor="transparent" />
        </View>
    );
    
}