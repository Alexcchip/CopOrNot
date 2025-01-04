// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { LocationProvider } from '../context/LocationContext'; // 
import { Keyboard, View, StyleSheet } from "react-native";
import StationProvider from '../context/StationContext'; // If using default export
import React, {useEffect, useState} from 'react';

export default function TabLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>{
      setKeyboardVisible(true); //hide footer when keybaord is visible
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); //show footer when keyboard is hidden
    });

    //clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  return (
    <StationProvider>
    <LocationProvider>
    <Tabs
      screenOptions={{
        tabBarStyle: isKeyboardVisible
        ? {display: 'none'}
        : {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#191521',
          borderTopWidth: 0,
          borderTopColor: '#E5E5E5',
          elevation: 10, 

        },
        
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: false,  
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        

        headerShown: false, //yesssir we in bussyiness now

      }}
    >
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bars" size={size} color={color} />
          ),
          tabBarBadgeStyle: {
            backgroundColor: '#FF3B30',
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size * 1.25} color={color} />
          ),
          // Individual tab styling (optional)
          tabBarItemStyle: {
            // paddingBottom: Platform.OS === 'ios' ? 0 : 5,
          },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map" size={size} color={color} />
          ),
          tabBarBadgeStyle: {
            backgroundColor: '#FF3B30',
          },
        }}
      />
    </Tabs>
    </LocationProvider>
    </StationProvider>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "black",
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: "center",
  },
  headerText: {
    paddingTop: 10,
    color: "white",
    fontSize: 48,
  },
  whiteStripe:{
    width: '100%',
    height: 5,
    backgroundColor: 'white',
  }
});