import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StackNewCampus, StackViewCampus } from './Campus';
import { StackNewCategories, StackViewCategories } from './Categories';
import { StackNewCourses, StackViewCourses } from './Courses';
import { StackNewEquipaments, StackViewEquipaments } from './Equipaments';
import { StackNewPlaces, StackViewPlaces } from './Places';
import { StackNewSchedules, StackViewSchedules } from './Schedules';
import { StackNewUsers, StackViewUsers } from './Users';

const navOptions = (navigation) => ({
    tabBarIcon: ({ tintColor }) => {
        let { routeName } = navigation.state;
        
        let iconName;
        if(routeName === 'Novo') {
            iconName = 'add';
        }
        else if(routeName === 'Visualizar') {
            iconName = 'list';
        }
        return (
            <MaterialIcons 
                name={`${iconName}`} 
                style={{fontSize: 30}} 
                color="#FFF"/>
        );
    }
})

const tabOptions = {
    activeBackgroundColor: '#042963',
    inactiveBackgroundColor: '#042963',
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    safeAreaInset: "bottom"
}

const options = {
    defaultNavigationOptions: ({ navigation }) => navOptions(navigation),
    tabBarOptions: tabOptions
}

export const UsersTabs = createBottomTabNavigator({
    Novo: StackNewUsers,
    Visualizar: StackViewUsers
}, options);

export const PlacesTabs = createBottomTabNavigator({
    Novo: StackNewPlaces,
    Visualizar: StackViewPlaces
}, options);

export const EquipamentsTabs = createBottomTabNavigator({
    Novo: StackNewEquipaments,
    Visualizar: StackViewEquipaments
}, options); 

export const CampusTabs = createBottomTabNavigator({
    Novo: StackNewCampus,
    Visualizar: StackViewCampus
}, options);

export const CoursesTabs = createBottomTabNavigator({
    Novo: StackNewCourses,
    Visualizar: StackViewCourses
}, options);

export const CategoriesTabs = createBottomTabNavigator({
    Novo: StackNewCategories,
    Visualizar: StackViewCategories
}, options);

export const SchedulesTabs = createBottomTabNavigator({
    Novo: StackNewSchedules,
    Visualizar: StackViewSchedules
}, options);