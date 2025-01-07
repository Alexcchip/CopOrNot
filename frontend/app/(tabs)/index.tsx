import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, RefreshControl} from 'react-native';
import CText from '../components/CText';
import { useStations } from '../context/StationContext';
import { useLocation } from '../context/LocationContext';
import Header from '../components/Header';
import LogPreview from '../components/LogPreview';
import axios from 'axios';

interface Report {
  timeStamp: Date;
  cop: boolean;
  station: string;
}

const App = () => {
  const { city } = useLocation(); // Access the user's location
  const [closestStation] = useState<string | undefined>(undefined); // Explicitly define the type
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

  // Find the closest station when the location changes
  useEffect(() => {
    async function fetchClosestStation() {
      if (location && stations.length > 0) {
        setIsLoading(true);
        const { closestStation } = getClosestStation(location.coords.latitude, location.coords.longitude);
        setClosestStation(closestStation?.station);
        setIsLoading(false);
      }
    }

    fetchClosestStation();
  }, [location, stations]);

  // Fetch logs when dependencies change
  useEffect(() => {
    if (stations && closestStation && city) {
      getLogs();
    }
  }, [stations, closestStation, city]);

  const getLogs = async () => {
    try {
      console.log('Fetching logs...');
      const response = await fetch(
        `https://copornot.onrender.com/api/reports/${city}/${closestStation}?timestamp=${Date.now()}`
      );
      const data = await response.json();

      const parsedData: Report[] = data
        .map((log: any) => ({
          ...log,
          timeStamp: new Date(log.timeStamp), // Convert to Date object
        }))
        .sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime()); // Sort by descending time

      console.log('Fetched and sorted logs:', parsedData);
      setLogs(parsedData);
    } catch (error) {
      console.error('Cannot get recent logs', error);
    }
  };

  const postData = async (copStatus: boolean, station: string | undefined, timeStamp: Date) => {
    if (!station) {
      Alert.alert('Error', 'No station data available.');
      return;
    }

    const body = {
      cop: copStatus,
      station: station,
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
    postData(true, closestStation, new Date());
    setButtonState({ ...buttonState, isCopPressed: true, isNotVisible: false });
  };

  const handleNotPress = () => {
    postData(false, closestStation, new Date());
    setButtonState({ ...buttonState, isNotPressed: true, isCopVisible: false });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getLogs();
    setRefreshing(false);
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
    refreshButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    refreshButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header />
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
