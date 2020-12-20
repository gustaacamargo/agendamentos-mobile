import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import NewCourse from '../pages/Courses/NewCourses';
import EditCourse from '../pages/Courses/EditCourses';
import ViewCourse from '../pages/Courses/ViewCourses';
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

export const StackNewCourses = createStackNavigator({
    NewCourses: {
        screen: NewCourse,
        navigationOptions: ({ navigation }) => options('Novo curso', navigation)
    },
    EditCourses: {
        screen: EditCourse,
        navigationOptions: ({ navigation }) => options('Editar curso', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});

export const StackViewCourses = createStackNavigator({
    ViewCourses: {
        screen: ViewCourse,
        navigationOptions: ({ navigation }) => options('Visualizar cursos', navigation)
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: headerOptions 
    }
});