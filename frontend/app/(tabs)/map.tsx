import React, {useState, useCallback, useEffect} from 'react';
import { View, StyleSheet, Text, useColorScheme, } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { useStations } from '../context/StationContext';
import PreviewBox from '../components/PreviewBox';
import {useFocusEffect} from '@react-navigation/native';

interface Polyline{
  shapeId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

interface Report {
  timeStamp: Date; // Ensure this is a Date type
  cop: boolean;
  station: string;
  trains: string | number;
}

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
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {"visibility": "off"}
    ]
  },
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

const getMBTAColorBySuffix = (shapeId: string) => {
  const suffix = shapeId.slice(10)
  const colorMapping: Record<string, string> = {
    "8000005": "green",
    "8000006": "green",
    "8000008": "pink",
    "8000009": "green",
    "8000012": "green",
    "8000013": "green",
    "8000015": "green",
    "8000018": "green",
    "899_0005": "red",
    "903_0008": "teal",
    "903_0017": "orange",
    "903_0018": "orange",
    "931_0009": "red",
    "931_0010": "red",
    "933_0009": "red",
    "933_0010": "red",
    "946_0013": "blue",
    "946_0014": "blue",
  };
  return colorMapping[suffix] || "white"; // Default to white if prefix not found
}
const getColorByPrefix = (shapeId: string) => {
  const prefix = shapeId.slice(0, 2); // Extract the first 2 characters
  const colorMapping: Record<string, string> = {
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

interface Station {
  station: string;
  trains: string | number;
}

export default function MapScreen() {
  const [recentLogs, setLogs] = useState<Report[] | null>(null);
  const colorScheme = useColorScheme();
  const { location, city } = useLocation();
  const { stations, error } = useStations();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [polylines, setPolylines] = useState<Polyline[]>([]);
  const [markerImage, setMarkerImage] = useState(
    require('../../assets/images/stationRegular.png')
  );

  const getLogs = async (selectedStation: Station) => {
    if (!selectedStation?.station || !selectedStation?.trains) {
      console.error('Invalid station or trains');
      return;
    }
    try {
      //console.log('Fetching logs...');
      const response = await fetch(
        `https://copornot.onrender.com/api/reports/${city}/${selectedStation.station}?trains=${encodeURIComponent(
          selectedStation.trains
        )}`
      );

      if (response.status === 404){
        setLogs([]);
        return;
      }

      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        setLogs([]);
        return;
      }

      const data = await response.json();
      //console.log('Raw API response:', data);

      const parsedData: Report[] = data
        .filter((log: any) => String(log.trains) === String(selectedStation.trains)) // Filter using strings
        .map((log: any) => ({
          ...log,
          timeStamp: new Date(log.timeStamp), // Convert to Date object
        }))
        .sort((a: Report, b: Report) => b.timeStamp.getTime() - a.timeStamp.getTime()); // Sort by descending time

      //console.log('Parsed and sorted logs:', parsedData);
      setLogs(parsedData);
    } catch (error) {
      console.error('Cannot get recent logs:', error);
    }
  };

  const handleRegionChangeComplete = (region: Region) => {
    const zoomLevel = Math.log2(360 / region.latitudeDelta); // Approximate zoom level
    
    if (zoomLevel < 10) {
      setMarkerImage(require('../../assets/images/stationRegularExtraSmall.png')); // Small for zoomed out
    } else if (zoomLevel < 14) {
      setMarkerImage(require('../../assets/images/stationRegularSmall.png')); // Medium for mid-zoom
    } else {
      setMarkerImage(require('../../assets/images/stationRegular.png')); // Large for zoomed in
    }
  };

  //fetchign logs for station
  useEffect(() => {
    if (selectedStation?.station && selectedStation?.trains) {
      getLogs(selectedStation); // Call getLogs with the station name
    }
  }, [selectedStation?.station, selectedStation?.trains])

  //fetching polylines for map building
  useEffect(() => {
    const fetchPolylines = async () => {
      try{
        if(!city){
          console.warn('no city bruhhh');
          return;
        }
        //const cityEnd = `${window.city}_polyline`;
        const response = await fetch(`https://copornot.onrender.com/api/polyline/${city}`);
        const data = await response.json();
        setPolylines(data);
      } catch (err) {
        console.error('failed to fetch polylines:', err)
      } 
    };
    fetchPolylines();
  }, [city]);

  const handleSelect = (station: Station) => {
    setSelectedStation(station);
  };

  const handleDeselect = () => {
    setSelectedStation(null);
  };

  const getColorMappingFunction = (city: string) => {
    if (city === 'nyc') {
      return getColorByPrefix;
    } else if (city === 'boston') {
      return getMBTAColorBySuffix;
    } else {
      console.warn('fuck is you doing there jitticus??');
      return () => 'white';
    }
  };

  const getColor = city ? getColorMappingFunction(city): () => 'white';

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
        onRegionChangeComplete={handleRegionChangeComplete} //tracking zoom
        initialRegion={{
          latitude: location ? location.coords.latitude : 40.7128,
          longitude: location ? location.coords.longitude : -74.0060,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
          //adjust default zoom
        }}
        onPress={handleDeselect}
      >
        {/* rendering polylines */}
        {polylines
        .filter((polylines) => polylines.shapeId.charAt(3) !== 'S')
        .map((polylines) => {
          const color = getColor(polylines.shapeId);
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
            //image={require('../../assets/images/stationRegularSmall.png')}
            image={markerImage}
            onPress={() => setTimeout(() => handleSelect(station), 0)}
           />
        ))}
      </MapView>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {selectedStation && (
        <View style={styles.wagwanContainer}>
          <PreviewBox
            title={selectedStation.station}
            trainLines={selectedStation.trains}
            logs={recentLogs || []}
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

