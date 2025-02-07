/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// Other Firebase services
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Navigation from './src/navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RouteProvider } from './src/context/RouteContext';
import { LogBox } from 'react-native';
import MapScreen from './src/screens/MapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomDrawerProvider } from './src/context/BottomDrawerContext';
import { NavigationProvider } from './src/context/NavigationProviderContext';

LogBox.ignoreAllLogs();

GoogleSignin.configure({
  webClientId: '838660230042-q8qo6lc1qeqmvubso64cpvudpfhj7nm9.apps.googleusercontent.com',
});


const App = () => {
  return (
    <BottomDrawerProvider>
      <SafeAreaView style={styles.root}>
        <RouteProvider>
          <NavigationProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Navigation />
            </GestureHandlerRootView>
            </NavigationProvider>
        </RouteProvider>
      </SafeAreaView>
    </BottomDrawerProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});

export default App;
