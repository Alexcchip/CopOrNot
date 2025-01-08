import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CText from '../components/CText';
import { useStations } from '../context/StationContext';
import { useLocation } from '../context/LocationContext'; // To get city
import SearchHeader from '../components/SearchHeader';
import PreviewBox from '../components/PreviewBox';

type Station = {
  _id: string;
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
};

type Report = {
  timeStamp: Date;
  cop: boolean;
  station: string;
};

const Stats = () => {
  const { stations } = useStations();
  const { city } = useLocation(); // Retrieve city from location context
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [stationLogs, setStationLogs] = useState<Record<string, Report[]>>({}); // Store logs for each station

  // Function to fetch logs for a given station
  const getLogs = async (stationName: string, trainLines: string | number) => {
    try {
      const response = await fetch(
        `https://copornot.onrender.com/api/reports/${city}/${stationName}`
      );

      if (!response.ok) return [];

      const data = await response.json();
      return data
        .map((log: any) => ({
          ...log,
          timeStamp: new Date(log.timeStamp), // Convert to Date object
        }))
        .sort((a: Report, b: Report) => b.timeStamp.getTime() - a.timeStamp.getTime())
        .slice(0, 3); // Return the most recent 3 logs
    } catch (error) {
      console.error(`Failed to fetch logs for station ${stationName}:`, error);
      return [];
    }
  };

  // Handle search query updates
  const handleChange = (query: string) => {
    const filtered = stations.filter((station) =>
      station.station.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  // Initialize with the first 25 stations and fetch logs
  useEffect(() => {
    if (stations.length > 0) {
      const initialStations = stations.slice(0, 25);
      setFilteredStations(initialStations);

      initialStations.forEach(async (station) => {
        const logs = await getLogs(station.station);
        setStationLogs((prev) => ({
          ...prev,
          [station.station]: logs,
        }));
      });
    }
  }, [stations, city]); // Added city as a dependency

  // Loading screen for when stations are not yet available
  if (stations.length === 0) {
    return (
      <View style={styles.container}>
        <SearchHeader onChange={handleChange} />
        <View style={styles.loadingContainer}>
          <CText style={styles.loadingText}>Loading stations...</CText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchHeader onChange={handleChange} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.previewContainer}>
          {filteredStations.map((station) => (
            <PreviewBox
              key={station._id}
              title={station.station}
              trainLines={station.trains}
              logs={stationLogs[station.station] || []} // Pass logs if available
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
    marginBottom: 0,
    marginTop: 15,
    paddingHorizontal: 10,
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
  container: {
    flex: 1,
    backgroundColor: '#261C2E',
  },
  scrollContent: {
    alignSelf: 'center',
    padding: 20,
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
