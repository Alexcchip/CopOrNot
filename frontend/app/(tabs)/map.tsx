import React, {useState} from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { useStations } from '../context/StationContext';
import PreviewBox from '../components/PreviewBox';

const sampleLogs = [
  { key: '12:41pm', value: 'Main Entrance (Cop)' },
  { key: '12:40pm', value: 'Side Entrance (No Cop)' },
  { key: '12:33pm', value: 'Main Entrance (Cop)' },
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
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        toolbarEnabled={false}
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
            onPress={() => setTimeout(() => handleSelect(station), 0)}
          >
          </Marker>
        ))}
      </MapView>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {selectedStation && (
        <View style={styles.wagwanContainer}>
          <PreviewBox
            title={selectedStation.station}
            trainLines={selectedStation.trains}
            data={Object.fromEntries(sampleLogs.map((log) => [log.key, log.value]))}
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
    padding: 0,
    margin: 0,
  },
  map: {
    flex: 1,
  },
  wagwanContainer: {
    position: 'absolute', // Place it above the map
    bottom: 30, // Adjust position from the bottom
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#191521',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center horizontally
    padding: 0,
  },
});

