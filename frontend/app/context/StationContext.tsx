import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the Station type
type Station = {
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
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

  // Data cleaning logic
  const cleanStationData = (rawData: any[]): Station[] => {
    return rawData.map((item) => ({
      lat: parseFloat(item[" lat"] || item.lat),
      lon: parseFloat(item[" lon"] || item.lon),
      station: item[" station"] || item.station,
      trains: item[" trains"] || item.trains,
      _id: item._id,
    }));
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://172.20.10.2:5000/api/stations');
        const rawData = await response.json();

        // Use the cleanStationData function to clean the raw data
        const cleanedData = cleanStationData(rawData);
        setStations(cleanedData); // Set the cleaned data to state
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

  const getClosestStation = (userLat: number, userLon: number) => {
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
