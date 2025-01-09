import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView} from 'react-native';
import CText from '../components/CText';
import { useStations } from '../context/StationContext';
import { useLocation } from '../context/LocationContext';
import Header from '../components/Header';
import LogPreview from '../components/LogPreview';
import axios from 'axios';

interface Station {
  station: string;
  trains: string | number;
}

interface ClosestStation {
  station: string;
  trains: string | number;
}

interface Report {
  timeStamp: Date; // Ensure this is a Date type
  cop: boolean;
  station: string;
  trains: string | number;
}

const App = () => {
  //const [notifsEnabled, setNotifsEnabled] = useState(false);
  const { location, city } = useLocation(); // Access user's location and city
  const { stations, getClosestStation } = useStations(); // Access station-related functionality
  const [closestStation, setClosestStation] = useState<ClosestStation | null>(null);
  const [recentLogs, setLogs] = useState<Report[] | null>(null);
  const [buttonState, setButtonState] = useState({
    isCopVisible: true,
    isNotVisible: true,
    isCopPressed: false,
    isNotPressed: false,
  });

  // useEffect(() => {
  //   (async () => {
  //     const {status} = await Notifications.getPermissionsAsync();
  //     setNotifsEnabled(status === 'granted');
  //   })();
  // }, []);

  // const sendNotification = async (title, body) => {
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title,
  //     body,
  //     data: { extraData: 'some data' },
  //   },
  //   trigger: { seconds: 2 }, // Adjust trigger timing if needed
  // });
  //};
  
  // useEffect(() => {
  //   //trigger noti
  //   if (closestStation){
  //     sendNotification(`${closestStation}`, 'Cop or Not?');
  //   }
  // }, [closestStation]);

  // Monitor updates to recentLogs
  // useEffect(() => {
  //   //console.log('recentLogs updated:', recentLogs);
  // }, [recentLogs]);


  const handleClosestStationChange = (station: Station | null) => {
    if (
      station &&
      (closestStation?.station !== station.station || closestStation?.trains !== station.trains)
    ) {
      setClosestStation({ station: station.station, trains: station.trains });
    }
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
    getLogs();
  }, [closestStation])
  
  // Find the closest station when location or stations change
  useEffect(() => {
    async function fetchClosestStation() {
      if (location && stations.length > 0) {
        try {
          const result = getClosestStation(location.coords.latitude, location.coords.longitude);
          if (result.closestStation) {
            if (result.closestStation) {
              setClosestStation({
                station: result.closestStation.station || '',
                trains: result.closestStation.trains || '',
              });
            }
            //console.log('Closest station set:', closestStation.station);
          } else {
            console.error('No closest station found');
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
      //console.log('Triggering getLogs...');
      getLogs();
    }
  }, [closestStation?.station]);

  //fetch logs when closestStation changes
  const getLogs = async () => {
    if (!closestStation) return;
    try {
      //console.log('Fetching logs...');
      const response = await fetch(
        `https://copornot.onrender.com/api/reports/${city}/${closestStation.station}?trains=${encodeURIComponent(
          closestStation.trains
        )}`
      );

      if (response.status === 404){
        setLogs([]);
        return;
      }

      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      //console.log('Raw API response:', data);

      const parsedData: Report[] = data
        .map((log: any) => ({
          ...log,
          timeStamp: new Date(log.timeStamp), // Convert to Date object
        }))
        .sort((a : Report, b : Report) => b.timeStamp.getTime() - a.timeStamp.getTime()); // Sort by descending time

      //console.log('Parsed and sorted logs:', parsedData);
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
      station: closestStation.station,
      trains: closestStation.trains,
      timeStamp: timeStamp.toISOString(),
    };

    try {
      const response = await axios.post(`https://copornot.onrender.com/api/post/${city}`, body);
      //console.log('Data saved:', response.data);

      // Re-fetch logs after posting
      await getLogs();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        Alert.alert('Error', 'Failed to save data.');
        console.error('Error saving data:', error.response?.data || error.message);
      } else {
        // Handle generic errors
        Alert.alert('Error', 'An unexpected error occurred.');
        console.error('Unexpected error:', error);
      }
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
                eating booty is healthier than eating poopy
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
                Do not put both arms on either side of the turnstile, lift your left, and swing forward to evade the $2.90 fare. Don't do that!
              </CText>
            )}
          </TouchableOpacity>
        )}
      </View>
      {/* Logs Section */}
      <View style={styles.logsContainer}>
        <ScrollView contentContainerStyle={styles.logScroll}>
          {recentLogs ? <LogPreview logs={recentLogs} /> : <CText>Loading logs...</CText>}
        </ScrollView>
      </View>
    </ScrollView>
  ); 
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
    backgroundColor: '#5581E0',
  },
  not: {
    backgroundColor: "#E3514C",
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
    paddingRight: 10,
    backgroundColor: '#191521',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  whiteStripe: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 2.5,
    backgroundColor: 'white',
  },
  logScroll: {
    flexGrow: 1,
    //backgroundColor: 'white',
  }
});

export default App;
