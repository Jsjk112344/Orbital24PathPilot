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

GoogleSignin.configure({
  webClientId: '838660230042-q8qo6lc1qeqmvubso64cpvudpfhj7nm9.apps.googleusercontent.com',
});


const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <RouteProvider><Navigation /></RouteProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});

export default App;
