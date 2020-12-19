import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import EditCategories from "../pages/Categories/EditCategories";
import NewCategories from "../pages/Categories/NewCategories";
import ViewCategories from "../pages/Categories/ViewCategories";

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
            <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: 5}} color="#FFF"/>
        </TouchableOpacity>
})

export const StackNewCategories = createStackNavigator({
    NewCategories: {
        screen: NewCategories,
        navigationOptions: ({ navigation }) => options('Anos', navigation)
    },
    EditCategories: {
        screen: EditCategories,
        navigationOptions: ({ navigation }) => options('Anos', navigation)
    }
}, {
    initialRouteName: 'NewCategories',
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});

export const StackViewCategories = createStackNavigator({
    ViewCategories: {
        screen: ViewCategories,
        navigationOptions: ({ navigation }) => options('Anos', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});