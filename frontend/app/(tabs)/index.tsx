import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, RefreshControl, ScrollView} from 'react-native';
import CText from '../components/CText';
import { useStations } from '../context/StationContext';
import { useLocation } from '../context/LocationContext';
import Header from '../components/Header';
import LogPreview from '../components/LogPreview';
import axios from 'axios';

interface Polyline{
  shapeId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}


const sampleLogs = [
  { timestamp: '12:41pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '12:40pm', entrance: 'Side Entrance', copOrNot: false },
  { timestamp: '12:33pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '12:05pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '11:59am', entrance: 'Side Entrance', copOrNot: false },
];

// unsused currently
// interface Station {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
//   distance: number; // Distance from the given location
// }

const App = () => {
  const { city, refreshLocation } = useLocation(); // Access the user's location
  const [refreshing, setRefreshing] = useState(false);
  const [closestStation] = useState<string | undefined>(undefined); // Explicitly define the type
  const [buttonState, setButtonState] = useState({
    isCopVisible: true,
    isNotVisible: true,
    isCopPressed: false,
    isNotPressed: false,
  });
  


  // Function to post data
  const postData = async (copStatus: boolean, station: string| undefined, timeStamp: Date) => {
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
      const response = await axios.post('https://copornot.onrender.com/api/post/'+city, body);
      //Alert.alert('Success', 'Data saved successfully!');
      console.log('Data saved:', response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
      console.error('Error saving data:', error.response ? error.response.data : error.message);
    }
  };

  // Handlers for button presses
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
    try{
      await refreshLocation();
    } catch (error) {
      console.error('fuck', error);
    } finally{
      setRefreshing(false);
    }
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
    whiteStripe:{
      position: 'absolute',
      top: 50,
      width: '100%',
      height: 2.5,
      backgroundColor: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
      translucent
      backgroundColor='transparent'
      barStyle="light-content"
      />
      <ScrollView
      contentContainerStyle={{flexGorw: 1}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header />
        {/* Cop or Not Section */}
        <View style={styles.copOrNotContainer}>
          {buttonState.isCopVisible && (
            <TouchableOpacity
              style={[
                styles.buttonBase,
                styles.cop,
                buttonState.isCopPressed && styles.pressed,
              ]}
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
              style={[
                styles.buttonBase,
                styles.not,
                buttonState.isNotPressed && styles.pressed,
              ]}
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
            <LogPreview logs={sampleLogs} />
          </View>
      </ScrollView>
    </View>
  );
};

export default App;
