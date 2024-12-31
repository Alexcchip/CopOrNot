import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { useStations } from '../context/StationContext';

export default function MapScreen() {
  const { location } = useLocation();
  const { stations, error } = useStations();
  console.log(stations[0])
  return (
    <View style={styles.container}>
      <MapView
        key={JSON.stringify(stations)}
        mapType='mutedStandard'
        showsUserLocation={true}
        style={styles.map}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: location ? location.coords.latitude : 40.7128,
          longitude: location ? location.coords.longitude : -74.0060,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {stations.map((station) => (
          <Marker
            key={station._id}
            coordinate={{
              latitude: station.lat,
              longitude: station.lon,
            }}
            title={station.station}
            description={`Trains: ${station.trains}`}
          />
        ))}
        {/* {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
        )} */}
      </MapView>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
