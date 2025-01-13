import React, {useEffect, useState} from 'react'
import CText from '../components/CText'
import { useStations } from '../context/StationContext'; 
import { useLocation } from '../context/LocationContext';
import {View, StyleSheet, StatusBar} from 'react-native'
import TrainIcon from '../components/TrainIcon'
import * as Location from 'expo-location';
import LoadingHeader from '../components/LoadingHeader';

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
                 'SIR' | 'TRAM1' | 'TRAM2';

interface HeaderProps {
  onClosestStationChange: (station: Station | null) => void;
}

//yo which dumbass put the styles up here :sob:
//mighta been me tbh
export default function Header({onClosestStationChange}: HeaderProps) {
    const { stations, getClosestStation } = useStations(); // Access stations and getClosestStation
    const { location } = useLocation(); // Access the user's location
    const [closestStation, setClosestStation] = useState<Station | null>(null); // Explicitly define the type
    const [isLoading, setIsLoading] = useState(true);
    
    //this state is used to rerender component every 5 secs
    //so that if user location changes itll update
    useEffect(() => {
      async function fetchClosestStation(){
        if (location && stations.length > 0) {
          setIsLoading(true);
          const { closestStation } = getClosestStation(location.coords.latitude, location.coords.longitude);
          setClosestStation(closestStation);
          onClosestStationChange(closestStation);
          setIsLoading(false);
        }
      }
      fetchClosestStation(); //fetches location on change
    }, [location, stations, onClosestStationChange]); //location and station changes are respected

    const styles = StyleSheet.create({
      headerContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "black",
        paddingTop: 50,
        paddingBottom: 30,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: "center",
      },
      headerText: {
        flex: 2,
        width: '100%',
        paddingTop: 10,
        paddingLeft: 20,
        color: "white",
        fontSize: 48,
      },
      whiteStripe:{
        position: 'absolute',
        top: 50,
        width: '100%',
        height: 2.5,
        backgroundColor: 'white',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#261C2E',
      },
      trainIconsContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        marginTop: 10,
      }
    });

    // render when loading
    if (isLoading){
      return (
        <View style={styles.headerContainer}>
          <View style={styles.whiteStripe} />
            <LoadingHeader />
          {/* <View style={styles.trainIconsContainer}>
            <TrainIcon trainLine='SIR' />
          </View> */}
          <StatusBar translucent backgroundColor="transparent" />
        </View>
      );
    }

    const trainLines =
      closestStation?.trains
        ? typeof closestStation.trains === 'string'
          ? closestStation.trains.split(' ').map((line) => line.trim())
          : [closestStation.trains.toString()] // Handle numerical trains
        : ['SIR']; // Fallback for missing trains

    return (
    
        <View style={styles.headerContainer}>
          <View style={styles.whiteStripe} />
          <CText style={styles.headerText}>{closestStation?.station || 'Where the fuck are you??'}</CText>
          <View style={styles.trainIconsContainer}>
            {trainLines.map((trainLine, index) => (
              <TrainIcon key={index} trainLine={trainLine} />
            ))}
          </View>
          <StatusBar translucent backgroundColor="transparent" />
        </View>
    );
    
}