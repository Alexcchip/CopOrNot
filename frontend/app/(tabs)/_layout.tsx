// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { LocationProvider } from '../context/LocationContext'; // 
import { View, Text, StyleSheet } from "react-native";
import StationProvider from '../context/StationContext'; // If using default export


export default function TabLayout() {
  return (
    <StationProvider>
    <LocationProvider>
    <Tabs
      screenOptions={{

        header: () => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Avenue X (F)</Text>
          </View>
        ),
        
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#191521',
          borderTopWidth: 0,
          borderTopColor: '#E5E5E5',
          elevation: 10, 

        },
        
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,  
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        

        headerShown: true, //yesssir we in bussyiness now

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
            <FontAwesome name="home" size={size} color={color} />
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
    backgroundColor: "blue",
    padding: 30,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
});