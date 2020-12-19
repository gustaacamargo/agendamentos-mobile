import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { StateProvider } from './src/reducer'
import Store from './src/store/reducers/index'

export default function App() {
  return (
    <StateProvider store={Store}>
      <StatusBar barStyle="light-content"/>
      <AppNavigator></AppNavigator>
    </StateProvider>
  );
}
