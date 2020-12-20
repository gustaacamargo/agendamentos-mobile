import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { StateProvider } from './src/reducer'
import Store from './src/store/reducers/index'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex:1, backgroundColor: '#042963' }} forceInset={{'top': 'never'}}>
        <StateProvider store={Store}>
        <StatusBar barStyle="light-content"/>
          <View style={{ flex: 1 }}>
            <AppNavigator></AppNavigator>
          </View>
        </StateProvider>
      </SafeAreaView>
      
    </>
  );
}
