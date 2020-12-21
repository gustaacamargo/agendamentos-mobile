import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import NewUsers from '../pages/Users/NewUsers';
import EditUsers from '../pages/Users/EditUsers';
import ViewUsers from '../pages/Users/ViewUsers';
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

export const StackNewUsers = createStackNavigator({
    NewUsers: {
        screen: NewUsers,
        navigationOptions: ({ navigation }) => options('Novo usuário', navigation)
    },
    EditUsers: {
        screen: EditUsers,
        navigationOptions: ({ navigation }) => options('Editar usuário', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});

export const StackViewUsers = createStackNavigator({
    ViewUsers: {
        screen: ViewUsers,
        navigationOptions: ({ navigation }) => options('Visualizar usuários', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});