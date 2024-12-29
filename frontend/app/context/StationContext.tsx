import React, { createContext, useContext, useEffect, useState } from 'react';

type Station = {
  lat: number;
  lon: number;
  station: string;
  trains: string | number;
  _id: string;
};

interface StationContextType {
  stations: Station[];
  error: string | null;
  refreshStations: () => Promise<void>;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    try {
      const response = await fetch("http://192.168.0.235:5000/api/stations");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const rawData = await response.json();
      const cleanedData = rawData.map((item: any) => ({
        lat: parseFloat(item[" lat"] || item.lat),
        lon: parseFloat(item[" lon"] || item.lon),
        station: item[' station'],
        trains: item[' trains'],
        _id: item._id,
      }));
      setStations(cleanedData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const refreshStations = async () => {
    await fetchStations();
  };

  return (
    <StationContext.Provider value={{ stations, error, refreshStations }}>
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
