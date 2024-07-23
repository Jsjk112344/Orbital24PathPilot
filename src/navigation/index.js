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
import MyTripsScreen from "../screens/MyTripsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import NewTrip from "../screens/NewTrip";
import InputStops from "../screens/InputStops";
import TripView from "../screens/TripView/TripView";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import BeneficiaryListScreen from "../screens/BeneficiaryListScreen/BeneficiaryListScreen";
import HelpScreen from "../screens/HelpScreen/HelpScreen";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import FAQDetailScreen from "../screens/FAQDetailScreen/FAQDetailScreen";

// Import beneficiary detail screens
import ApexDetails from "../screens/BeneficiaryDetails/ApexDetails";
import AscendDetails from "../screens/BeneficiaryDetails/AscendDetails";
import BlessedGraceDetails from "../screens/BeneficiaryDetails/BlessedGraceDetails";
import ChengHongDetails from "../screens/BeneficiaryDetails/ChengHongDetails";
import ClubRainbowDetails from "../screens/BeneficiaryDetails/ClubRainbowDetails";
import EnDetails from "../screens/BeneficiaryDetails/EnDetails";
import FilosDetails from "../screens/BeneficiaryDetails/FilosDetails";
import FFTHDetails from "../screens/BeneficiaryDetails/FFTHDetails";
import FFFADetails from "../screens/BeneficiaryDetails/FFFADetails";
import HopesInMealsDetails from "../screens/BeneficiaryDetails/HopesInMealsDetails";
import HaoRenHaoShiDetails from "../screens/BeneficiaryDetails/HaoRenHaoShiDetails";
import KrsnaDetails from "../screens/BeneficiaryDetails/KrsnaDetails";
import MummyYummyDetails from "../screens/BeneficiaryDetails/MummyYummyDetails";
import RealmDetails from "../screens/BeneficiaryDetails/RealmDetails";
import LovingHeartDetails from "../screens/BeneficiaryDetails/LovingHeartDetails";
import MetroYMCADetails from "../screens/BeneficiaryDetails/MetroYMCADetails";

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

function BeneficiaryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BeneficiaryList" component={BeneficiaryListScreen} />
      <Stack.Screen name="ApexDetails" component={ApexDetails} />
      <Stack.Screen name="AscendDetails" component={AscendDetails} />
      <Stack.Screen name="BlessedGraceDetails" component={BlessedGraceDetails} />
      <Stack.Screen name="ChengHongDetails" component={ChengHongDetails} />
      <Stack.Screen name="ClubRainbowDetails" component={ClubRainbowDetails} />
      <Stack.Screen name="EnDetails" component={EnDetails} />
      <Stack.Screen name="FilosDetails" component={FilosDetails} />
      <Stack.Screen name="FFTHDetails" component={FFTHDetails} />
      <Stack.Screen name="FFFADetails" component={FFFADetails} />
      <Stack.Screen name="HaoRenHaoShiDetails" component={HaoRenHaoShiDetails} />
      <Stack.Screen name="HopesInMealsDetails" component={HopesInMealsDetails} />
      <Stack.Screen name="KrsnaDetails" component={KrsnaDetails} />
      <Stack.Screen name="LovingHeartDetails" component={LovingHeartDetails} />
      <Stack.Screen name="RealmDetails" component={RealmDetails} />
      <Stack.Screen name="MummyYummyDetails" component={MummyYummyDetails} />
      <Stack.Screen name="MetroYMCADetails" component={MetroYMCADetails} />
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Map') iconName = 'map';
          else if (route.name === 'Plan Route') iconName = 'road';
          else if (route.name === 'Beneficiaries') iconName = 'users';
          else if (route.name === 'Profile') iconName = 'user';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Plan Route" component={PlanRouteStack} />
      <Tab.Screen name="Beneficiaries" component={BeneficiaryStack} />
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
        <Stack.Screen name ="Map" component={MapScreen}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="MyTrips" component={MyTripsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="FAQDetail" component={FAQDetailScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
