import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

// Define the Station type
type Station = {
  lat: number;
  lon: number;
  station: string;
  trains: string;
  _id: string;
};

// Define the context type
type StationContextType = {
  stations: Station[];
  getClosestStation: (userLat: number, userLon: number) => { closestStation: Station | null; shortestDistance: number };
  error: string | null;
};

export const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const cleanStationData = (rawData: any[]): Station[] => {
    return rawData.map((item) => ({
      lat: parseFloat(item[" lat"] || item.lat),
      lon: parseFloat(item[" lon"] || item.lon),
      station: item[" station"] || item.station,
      trains: String(item[" trains"] || item.trains),
      _id: item._id,
    }));
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Request permission for location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        // Get user location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Determine the API endpoint based on city
        const isBoston = latitude >= 42.0 && latitude <= 42.4 && longitude >= -71.2 && longitude <= -70.9;
         global.city = isBoston
          ? `boston`
          : `nyc`;
          const apiUrl = `https://copornot.onrender.com/api/city/${global.city}`;
          const response = await fetch(apiUrl);
        const rawData = await response.json();

        // Clean and set station data
        const cleanedData = cleanStationData(rawData);
        //console.log(cleanedData);
        setStations(cleanedData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

  const getClosestStation = (
    userLat: number, userLon: number
  ): { closestStation: Station | null; shortestDistance: number } => {
    if (stations.length === 0) return { closestStation: null, shortestDistance: Infinity };

    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of Earth in km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    };

    let closestStation: Station | null = null;
    let shortestDistance = Infinity;

    stations.forEach((station) => {
      const distance = calculateDistance(userLat, userLon, station.lat, station.lon);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestStation = station;
      }
    });

    return { closestStation, shortestDistance };
  };

  return (
    <StationContext.Provider value={{ stations, getClosestStation, error }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};

export default StationProvider;
