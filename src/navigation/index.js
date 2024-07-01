import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import all screen components
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MapScreen from "../screens/MapScreen";
import RouteScreen from "../screens/RouteScreen";
import MyTripsScreen from "../screens/MyTripsScreen";  // Renamed NotificationsScreen to MyTripsScreen
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import NewTrip from "../screens/NewTrip";
import InputStops from "../screens/InputStops";
import TripView from "../screens/TripView/TripView";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapMain" component={MapScreen} />
      <Stack.Screen name="NewTrip" component={NewTrip} />
      <Stack.Screen name="InputStops" component={InputStops} />
      <Stack.Screen name="TripView" component={TripView} />
    </Stack.Navigator>
  );
}

function PlanRouteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanRouteMain" component={RouteScreen} />
      <Stack.Screen name="NewTrip" component={NewTrip} />
      <Stack.Screen name="InputStops" component={InputStops} />
      <Stack.Screen name="TripView" component={TripView} />
    </Stack.Navigator>
  );
}

function MyTripsStack() {  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTripsMain" component={MyTripsScreen} />  
      <Stack.Screen name="TripView" component={TripView} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Map') iconName = 'map';
        else if (route.name === 'Plan Route') iconName = 'road';
        else if (route.name === 'My Trips') iconName = 'suitcase';  
        else if (route.name === 'Profile') iconName = 'user';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}>
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Plan Route" component={PlanRouteStack} />
      <Tab.Screen name="My Trips" component={MyTripsStack} />  
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
