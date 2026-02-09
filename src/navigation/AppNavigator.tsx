/**
 * App Navigator
 * Main navigation structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens (we'll create these)
import GameScreen from '@screens/GameScreen';
import UpgradeScreen from '@screens/UpgradeScreen';
import StatsScreen from '@screens/StatsScreen';
import StoreScreen from '@screens/StoreScreen';
import QuestScreen from '@screens/QuestScreen';

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  Upgrade: { departmentId: string };
};

export type MainTabParamList = {
  Game: undefined;
  Quests: undefined;
  Stats: undefined;
  Store: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Bottom tab navigator for main app sections
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
      }}
    >
      <Tab.Screen
        name="Game"
        component={GameScreen}
        options={{
          tabBarLabel: 'Dealership',
          // TODO: Add icon
        }}
      />
      <Tab.Screen
        name="Quests"
        component={QuestScreen}
        options={{
          tabBarLabel: 'Quests',
          // TODO: Add icon
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Statistics',
          // TODO: Add icon
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          // TODO: Add icon
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root navigator
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Upgrade"
          component={UpgradeScreen}
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Upgrades',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
