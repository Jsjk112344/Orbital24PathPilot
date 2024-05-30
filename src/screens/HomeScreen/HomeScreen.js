import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapScreen from "../MapScreen";
import RouteScreen from "../RouteScreen";
import TasksScreen from '../TasksScreen';
import ProfileScreen from "../ProfileScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Route') {
              iconName = 'road';
            } else if (route.name === 'Tasks') {
              iconName = 'tasks';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Route" component={RouteScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
