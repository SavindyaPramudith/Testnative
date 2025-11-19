import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = require('../screens/HomeScreen').default;

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, label, color }: { icon: string; label: string; color: string }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, { color }]}>{icon}</Text>
    <Text style={[styles.tabLabel, { color }]}>{label}</Text>
  </View>
);

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="🏠" label="Home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={HomeScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="🔍" label="Search" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={HomeScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="➕" label="Add" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={HomeScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="👤" label="Profile" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={HomeScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="⚙️" label="Settings" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
});
