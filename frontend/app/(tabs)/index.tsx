import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import CText from '../components/CText';
import { useStations } from '../context/StationContext';
import { useLocation } from '../context/LocationContext';
import Header from '../components/Header';
import LogPreview from '../components/LogPreview';
import axios from 'axios';

type Station = {
  _id: string;
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
};

interface Report {
  timeStamp: Date;
  cop: boolean;
  station: string;
}

const App = () => {
  const { location, city } = useLocation(); // Access user's location and city
  const { stations, getClosestStation } = useStations(); // Access station-related functionality
  const [closestStation, setClosestStation] = useState<string | undefined>(undefined);
  const [buttonState, setButtonState] = useState({
    isCopVisible: true,
    isNotVisible: true,
    isCopPressed: false,
    isNotPressed: false,
  });
  const [recentLogs, setLogs] = useState<Report[] | null>(null);

  // Monitor updates to recentLogs
  useEffect(() => {
    console.log('recentLogs updated:', recentLogs);
  }, [recentLogs]);

  const handleClosestStationChange = (station: Station | null) => {
    setClosestStation(station?.station || null);
  };

  useEffect(() => {
    if (closestStation) {
      setButtonState({
        isCopVisible: true,
        isNotVisible: true,
        isCopPressed: false,
        isNotPressed: false,
      });
    }
  }, [closestStation])
  
  // Find the closest station when location or stations change
  useEffect(() => {
    async function fetchClosestStation() {
      if (location && stations.length > 0) {
        try {
          const { closestStation } = getClosestStation(location.coords.latitude, location.coords.longitude);
          if (closestStation) {
            setClosestStation(closestStation.station);
            console.log('Closest station set:', closestStation.station);
          } else {
            console.error('No closest station found.');
          }
        } catch (error) {
          console.error('Error fetching closest station:', error);
        }
      }
    }

    fetchClosestStation();
  }, [location, stations]);

  // Fetch logs when dependencies change
  useEffect(() => {
    if (stations && closestStation && city) {
      console.log('Triggering getLogs...');
      getLogs();
    }
  }, [stations, closestStation, city]);

  const getLogs = async () => {
    try {
      console.log('Fetching logs...');
      const response = await fetch(
        `https://copornot.onrender.com/api/reports/${city}/${closestStation}`
      );

      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Raw API response:', data);

      const parsedData: Report[] = data
        .map((log: any) => ({
          ...log,
          timeStamp: new Date(log.timeStamp), // Convert to Date object
        }))
        .sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime()); // Sort by descending time

      console.log('Parsed and sorted logs:', parsedData);
      setLogs(parsedData);
    } catch (error) {
      console.error('Cannot get recent logs:', error);
    }
  };

  const postData = async (copStatus: boolean, timeStamp: Date) => {
    if (!closestStation) {
      Alert.alert('Error', 'No station data available.');
      return;
    }

    const body = {
      cop: copStatus,
      station: closestStation,
      timeStamp: timeStamp.toISOString(),
    };

    try {
      const response = await axios.post(`https://copornot.onrender.com/api/post/${city}`, body);
      console.log('Data saved:', response.data);

      // Re-fetch logs after posting
      await getLogs();
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
      console.error('Error saving data:', error.response ? error.response.data : error.message);
    }
  };

  const handleCopPress = () => {
    postData(true, new Date());
    setButtonState({ ...buttonState, isCopPressed: true, isNotVisible: false });
  };

  const handleNotPress = () => {
    postData(false, new Date());
    setButtonState({ ...buttonState, isNotPressed: true, isCopVisible: false });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#261C2E',
    },
    copOrNotContainer: {
      paddingTop: 20,
      position: 'relative',
      flex: 3,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: '2.5%',
      backgroundColor: 'transparent',
    },
    buttonBase: {
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginHorizontal: '2.5%',
    },
    cop: {
      backgroundColor: '#ED4D4D',
    },
    not: {
      backgroundColor: '#6DC35E',
    },
    pressed: {
      backgroundColor: 'grey',
    },
    copOrNotText: {
      fontSize: 68,
      color: 'white',
      textAlign: 'center',
    },
    underText: {
      fontSize: 16,
      color: 'lightgrey',
      textAlign: 'center',
    },
    logsContainer: {
      flex: 4,
      width: '90%',
      borderRadius: 10,
      marginVertical: '5%',
      backgroundColor: '#191521',
      alignItems: 'center',
      justifyContent: 'center',
    },
    whiteStripe: {
      position: 'absolute',
      top: 50,
      width: '100%',
      height: 2.5,
      backgroundColor: 'white',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header  onClosestStationChange={handleClosestStationChange}/>
      {/* Cop or Not Section */}
      <View style={styles.copOrNotContainer}>
        {buttonState.isCopVisible && (
          <TouchableOpacity
            style={[styles.buttonBase, styles.cop, buttonState.isCopPressed && styles.pressed]}
            onPress={handleCopPress}
            disabled={buttonState.isCopPressed}
          >
            <View style={styles.whiteStripe} />
            <CText style={styles.copOrNotText}>Cop</CText>
            {buttonState.isCopPressed && (
              <CText style={styles.underText} fontType="regular italic">
                Rip bro, it be like that sometimes.
              </CText>
            )}
          </TouchableOpacity>
        )}
        {buttonState.isNotVisible && (
          <TouchableOpacity
            style={[styles.buttonBase, styles.not, buttonState.isNotPressed && styles.pressed]}
            onPress={handleNotPress}
            disabled={buttonState.isNotPressed}
          >
            <View style={styles.whiteStripe} />
            <CText style={styles.copOrNotText}>Not</CText>
            {buttonState.isNotPressed && (
              <CText style={styles.underText} fontType="regular italic">
                Let’s go!
              </CText>
            )}
          </TouchableOpacity>
        )}
      </View>
      {/* Logs Section */}
      <View style={styles.logsContainer}>
        {recentLogs ? <LogPreview logs={recentLogs} /> : <CText>Loading logs...</CText>}
      </View>
    </ScrollView>
  );
};

export default App;
