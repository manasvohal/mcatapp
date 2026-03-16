import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';
import LibraryScreen from '../screens/LibraryScreen';
import QuizScreen from '../screens/QuizScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

function TabIcon({ name, focused, label }) {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? COLORS.blue : '#9CA3AF'}
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
        initialRouteName="HomeTab"
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="FeedTab"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                name={focused ? 'infinite' : 'infinite-outline'}
                focused={focused}
                label="Feed"
              />
            ),
          }}
        />
        <Tab.Screen
          name="QuizTab"
          component={QuizScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                name={focused ? 'game-controller' : 'game-controller-outline'}
                focused={focused}
                label="Quiz"
              />
            ),
          }}
        />
        <Tab.Screen
          name="LibraryTab"
          component={LibraryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                name={focused ? 'library' : 'library-outline'}
                focused={focused}
                label="Library"
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProgressTab"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                name={focused ? 'bar-chart' : 'bar-chart-outline'}
                focused={focused}
                label="Progress"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabLabelActive: {
    color: COLORS.blue,
  },
});
