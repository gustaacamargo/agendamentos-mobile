import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { StateProvider } from './src/reducer'
import Store from './src/store/reducers/index'

export default function App() {
  return (
    <StateProvider store={Store}>
      <StatusBar barStyle="dark-content"/>
      <Routes></Routes>
    </StateProvider>
  );
}
