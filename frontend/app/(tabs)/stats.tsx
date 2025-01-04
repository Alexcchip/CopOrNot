import React, { useEffect, useState } from 'react'
import { StatusBar, View, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
import CText from '../components/CText'
import { useStations } from '../context/StationContext'
import SearchHeader from '../components/SearchHeader'
import PreviewBox from '../components/PreviewBox'

type Station = {
  _id: string;
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
};

const Stats = () => {
  const {stations} = useStations();
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  //handleChange for whenever search query updates
  const handleChange = (query: string) => {
    const filtered = stations.filter((station) =>
      station.station.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  //initializes empty list as first 25 stations to populate stats page on new load
  useEffect(() => {
    if (stations.length > 0){
      setFilteredStations(stations.slice(0, 25));
    }
  }, [stations]);

  //loading screen for when stations is taking a bit, shouldnt ever happen though
  if (stations.length === 0) {
    return (
      <View style={styles.container}>
        <SearchHeader onChange={handleChange}/>
        <View style={styles.loadingContainer}>
          <CText style={styles.loadingText}>Loading stations...</CText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <SearchHeader onChange={handleChange}/>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.previewContainer}>
              {filteredStations.map((station) => (
                <PreviewBox
                  key={station._id}
                  title={station.station}
                  trainLines={station.trains}
                  data={{
                    Latitude: station.lat,
                    Longitude: station.lon,
                  }}
                />
              ))}
            </View>
        </ScrollView>
    </View>
  );
};

// Base Style for Consistency
const baseViewStyle = {
  position: 'relative',
  borderRadius: 10,
  width: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
};

// StyleSheet
const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
    marginBottom: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    
  },
  searchInput: {
    height: 60,
    //borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#333',
    fontSize: 24,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15, // Add more padding for better appearance
    //fontSize: 36, // Increase font size for larger text
    color: 'white',
  },
  placeholderText: {
    position: 'absolute',
    left: 15, // Match padding of text input
    top: 18, // Adjust for larger height
    fontSize: 24, // Match font size of text input
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  whiteStripe:{
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#261C2E',
  },
  scrollContent: {
    alignSelf: 'center',
    padding: 20, // Add padding for a better scroll experience
    paddingTop: 10,
    width: '100%',
  },
  previewContainer: {
    alignItems: 'center',
    flex: 4,
    marginTop: 0,
    marginBottom: '5%',
    width: '100%',
  },
});

export default Stats;
