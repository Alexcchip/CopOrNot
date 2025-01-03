import React, {useState} from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { useStations } from '../context/StationContext';
import LogPreview from '../components/LogPreview'

const sampleLogs = [
  { timestamp: '12:41pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '12:40pm', entrance: 'Side Entrance', copOrNot: false },
  { timestamp: '12:33pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '12:05pm', entrance: 'Main Entrance', copOrNot: true },
  { timestamp: '11:59am', entrance: 'Side Entrance', copOrNot: false },
];

const lightModeStyle = [];
const darkModeStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#424242" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#000000" }]
  }
];

export default function MapScreen() {
  
  const colorScheme = useColorScheme();
  const { location } = useLocation();
  const { stations, error } = useStations();
  const [selectedStation, setSelectedStation] = useState(null);

  const handleSelect = (station) => {
    setSelectedStation(station);
  };

  const handleDeselect = () => {
    setSelectedStation(null);
  }

  return (
    <View style={styles.container}>
      <MapView
        key={JSON.stringify(stations)}
        showsUserLocation={true}
        style={styles.map}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        customMapStyle={colorScheme === 'dark' ? darkModeStyle : lightModeStyle}
        initialRegion={{
          latitude: location ? location.coords.latitude : 40.7128,
          longitude: location ? location.coords.longitude : -74.0060,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleDeselect}
      >
        {stations.map((station) => (
          <Marker
            key={station._id}
            coordinate={{
              latitude: station.lat,
              longitude: station.lon,
            }}
            // title={station.station}
            // description={`Trains: ${station.trains}`}
            image={require('../../assets/images/stationRegular.png')}
            onPress={() => handleSelect(station)}
          >
          </Marker>
        ))}
      </MapView>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {selectedStation && (
        <View style={styles.wagwanContainer}>
          <LogPreview
              //station={selectedStation}
              logs={sampleLogs}
              onClose={handleDeselect}
            />
        </View>
          
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  map: {
    flex: 1,
  },
  wagwanContainer: {
    position: 'absolute', // Place it above the map
    bottom: 20, // Adjust position from the bottom
    width: '90%',
    borderRadius: 10,
    marginVertical: '5%',
    backgroundColor: '#191521',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center horizontally
    padding: 10,
  },
});

