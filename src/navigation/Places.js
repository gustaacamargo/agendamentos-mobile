import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import NewPlaces from '../pages/Places/NewPlaces';
import EditPlaces from '../pages/Places/EditPlaces';
import ViewPlaces from '../pages/Places/ViewPlaces';
import { screenWidth } from '../constants/screen';

const headerOptions = {
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: '#042963'
}

const options = (title, navigation) => ({
    title: title,
    headerLeft: () =>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
            <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: screenWidth * 0.04}} color="#FFF"/>
        </TouchableOpacity>
})

export const StackNewPlaces = createStackNavigator({
    NewPlaces: {
        screen: NewPlaces,
        navigationOptions: ({ navigation }) => options('Nova sala', navigation)
    },
    EditPlaces: {
        screen: EditPlaces,
        navigationOptions: ({ navigation }) => options('Editar sala', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});

export const StackViewPlaces = createStackNavigator({
    ViewPlaces: {
        screen: ViewPlaces,
        navigationOptions: ({ navigation }) => options('Visualizar salas', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});