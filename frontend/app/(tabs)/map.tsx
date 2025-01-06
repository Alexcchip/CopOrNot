import React, {useState, useCallback, useEffect} from 'react';
import { View, StyleSheet, Text, useColorScheme, } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { useStations } from '../context/StationContext';
import PreviewBox from '../components/PreviewBox';
import {useFocusEffect} from '@react-navigation/native'

interface Polyline{
  shapeId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

const sampleLogs = [
  { key: '12:41pm', value: 'Main Entrance (Cop)' },
  { key: '12:40pm', value: 'Side Entrance (No Cop)' },
  { key: '12:33pm', value: 'Main Entrance (Cop)' },
];

const lightModeStyle = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {"visibility": "off"}
    ]
  },
];
const darkModeStyle = [
  // {
  //   "featureType": "all",
  //   "elementType": "labels",
  //   "stylers": [
  //     {"visibility": "off"}
  //   ]
  // },
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

const getMBTAColorBySuffix = (shapeId) => {
  const suffix = shapeId.slice(10)
  const colorMapping = {
    "8000005": "red",
    "8000006": "blue",
    "8000008": "pink",
    "8000009": "orange",
    "8000012": "white",
    "8000013": "yellow",
    "8000015": "green",
    "8000018": "gray",
    "899_0005": "purple",
    "903_0008": "teal",
    "903_0017": "brown",
    "903_0018": "brown",
    "931_0009": "brown",
    "931_0010": "brown",
    "933_0009": "brown",
    "933_0010": "brown",
    "946_0013": "brown",
    "946_0014": "brown",
  };
  return colorMapping[suffix] || "white"; // Default to white if prefix not found
}
const getColorByPrefix = (shapeId) => {
  const prefix = shapeId.slice(0, 2); // Extract the first 2 characters
  const colorMapping = {
    "1.": "#ee342e", 
    "2.": "#ee342e",
    "3.": "#ee342e", 
    "4.": "#00933b",
    "5.": "#00933b",
    "6.": "#00933b",
    "7.": "#b933ae",
    "A.": "#2852ad",
    "C.": "#2852ad",
    "E.": "#2852ad",
    "B.": "#ff6219",
    "D.": "#ff6219",
    "F.": "#ff6219",
    "M.": "#ff6219",
    "G.": "#6dbe45",
    "J.": "#996433",
    "Z.": "#996433",
    "L.": "#a7a9ac",
    "N.": "#fccc0a",
    "Q.": "#fccc0a",
    "R.": "#fccc0a",
    "W.": "#fccc0a",
    "GS": "#808183",
    "FS": "#808183",
    "H.": "#808183",
    "SI": "#0078c6",
  };
  return colorMapping[prefix] || "white"; // Default to white if prefix not found
};

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const { location } = useLocation();
  const { stations, error } = useStations();
  const [selectedStation, setSelectedStation] = useState(null);
  const [polylines, setPolylines] = useState<Polyline[]>([]);

  //fetching polylines for map building
  useEffect(() => {
    const fetchPolylines = async () => {
      try{
        const cityEnd =  `${window.city}_polyline`
        const response = await fetch("https://copornot.onrender.com/api/polyline/"+cityEnd);
        const data = await response.json();
        setPolylines(data);
      } catch (err) {
        console.error('failed to fetch polylines:', err)
      } 
    };
    fetchPolylines();
  }, []);

  const handleSelect = (station) => {
    setSelectedStation(station);
  };

  const handleDeselect = () => {
    setSelectedStation(null);
  }

  useFocusEffect(
    useCallback(() =>{
      //console.log('Map in Fuckus');

      return () => {
        //console.log('map unfuckus');
        setSelectedStation(null);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <MapView
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
        {/* rendering polylines */}
        {polylines
        .filter((polylines) => polylines.shapeId.charAt(3) !== 'S')
        .map((polylines) => {
          const color = getMBTAColorBySuffix(polylines.shapeId);
          return(
            <Polyline
              key={polylines.shapeId}
              coordinates={polylines.coordinates}
              strokeColor={color}
              strokeWidth={5}
            />
          );
        })}

        {/*rendering station markers*/}
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

