import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import NewCampus from '../pages/Campus/NewCampus';
import EditCampus from '../pages/Campus/EditCampus';
import ViewCampus from '../pages/Campus/ViewCampus';
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

export const StackNewCampus = createStackNavigator({
    NewCampus: {
        screen: NewCampus,
        navigationOptions: ({ navigation }) => options('Novo campus', navigation)
    },
    EditCampus: {
        screen: EditCampus,
        navigationOptions: ({ navigation }) => options('Editar campus', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});

export const StackViewCampus = createStackNavigator({
    ViewCampus: {
        screen: ViewCampus,
        navigationOptions: ({ navigation }) => options('Visualizar campus', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});