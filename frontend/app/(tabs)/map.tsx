import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext'; // Adjust the path as needed


type Station = {
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
  _id: string;
};

export default function MapScreen() {
  const { location } = useLocation();
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);
  console
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://172.20.10.2:5000/api/stations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        console.log(location)
        const cleanedData = rawData.map((item: any) => ({
          lat: parseFloat(item[" lat"] || item.lat), // Clean key and ensure it's a number
          lon: parseFloat(item[" lon"] || item.lon),
          station: item[' station'],
          trains: item[' trains'] ,
          _id: item._id,
        }));
  
        // Log the first cleaned element
        if (cleanedData.length > 0) {
          console.log("First Cleaned Element:", cleanedData[0]);
        } else {
          console.log("No data returned from API");
        }
  
        setStations(cleanedData);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching stations:", err.message);
      }
    };
  
    fetchStations();
  }, []);  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7128, 
          longitude: -74.0060,
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
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue" // Differentiates the user's marker
          />
        )}
      </MapView>
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
