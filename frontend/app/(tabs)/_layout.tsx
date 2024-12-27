// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        
        // Tab Bar Style
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#191521',
          borderTopWidth: 0,
          borderTopColor: '#E5E5E5',
          elevation: 10, 

        },
        
        // Active Tab Style
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,  // This removes the text labels
        // Label Style
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        

        headerShown: false, // Add this line to hide the header globally

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
  );
}