import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';

interface LocationContextType {
  location: Location.LocationObject | null;
  city: string | null;
  setCity: (city: string | null) => void;
  refreshLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startLocationUpdates = async () => {
      try{
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.error('permissions denid :(');
          setFallbackLocation();
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 5,
          },
          async (newLocation) => {
            setLocation(newLocation);
            const cityName = await getCityFromCoords(
              newLocation.coords.latitude,
              newLocation.coords.longitude
            );
            setCity(cityName);
          }
        );
      } catch (error) {
        console.error('error starting location updates: ', error);
        setFallbackLocation();
      }
    };

    startLocationUpdates();

    //cleanup subscription upon unmount
    return () => subscription?.remove();
  }, []);

  const refreshLocation = async() => {
    try{
      const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
      const cityName = await getCityFromCoords(
        newLocation.coords.latitude,
        newLocation.coords.longitude
      );
      setCity(cityName);
    } catch (error){
      console.error('failed to refresh:', error);
    }
  };

  const setFallbackLocation = () => {
    setLocation({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
    setCity('nyc');
  };
  return (
    <LocationContext.Provider value={{ location, city, refreshLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

const getCityFromCoords = async(latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    const normalizedCity = normalizeCityName(data.city || data.locality || 'unk');
    return normalizedCity;
  } catch (error){
    console.error("error fetching city name:", error);
    return 'unknown city';
  }
};

//helper to normalize city names
const normalizeCityName = (cityName: string): string => {
  const cityMapping: Record<string, string> = {
    'New York City': 'nyc',
    'Boston': 'boston',
  };
  return cityMapping[cityName] || cityName.toLowerCase().replace(/\s+/g, '_');
}

// Add this default export
export default LocationProvider;
