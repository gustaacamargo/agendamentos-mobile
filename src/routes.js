import React from 'react';
import { Button, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './pages/Login/Login';
import ViewSchedules from './pages/Schedules/ViewSchedules';
import NewSchedules from './pages/Schedules/NewSchedules';
import ViewCategories from './pages/Categories/ViewCategories';
import NewCategories from './pages/Categories/NewCategories';
import CustomDrawer from './components/CustomDrawer';

const StackLogin = createStackNavigator({
        Login: {
            screen: Login,
        },
    }, {
        defaultNavigationOptions: {
            headerShown: false,
        }
});

const StackViewSchedules = createStackNavigator({
    Visualizar: {
        screen: ViewSchedules,
        navigationOptions: ({ navigation }) => ({
            title: 'Agendamentos',
            headerLeft: () =>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                    <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: 5}} color="#FFF"/>
                </TouchableOpacity>
            
        })
    },
    }, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#042963'
        }
        
    }
});

const StackNewSchedules = createStackNavigator({
    NewSchedules: {
        screen: NewSchedules,
        navigationOptions: ({ navigation }) => ({
            title: 'Agendamentos',
            headerLeft: () =>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                    <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: 5}} color="#FFF"/>
                </TouchableOpacity>
            
        })
    },
    }, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#042963'
        }
        
    }
});

const SchedulesTabs = createBottomTabNavigator({
        Novo: StackNewSchedules,
        Visualizar: StackViewSchedules
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
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
        }),
        tabBarOptions: {
            activeBackgroundColor: '#042963',
            inactiveBackgroundColor: '#042963',
            activeTintColor: 'white',
            inactiveTintColor: 'gray'
        }
});

const StackViewCategories = createStackNavigator({
    Visualizar: {
        screen: ViewCategories,
        navigationOptions: ({ navigation }) => ({
            title: 'Anos',
            headerLeft: () =>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                    <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: 5}} color="#FFF"/>
                </TouchableOpacity>
            
        })
    },
    }, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#042963'
        }
        
    }
});

const StackNewCategories = createStackNavigator({
    NewCategories: {
        screen: NewCategories,
        navigationOptions: ({ navigation }) => ({
            title: 'Agendamentos',
            headerLeft: () =>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                    <MaterialIcons name="menu" style={{fontSize: 30, marginLeft: 5}} color="#FFF"/>
                </TouchableOpacity>
            
        })
    },
    }, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#042963'
        }
        
    }
});

const CategoriesTabs = createBottomTabNavigator({
        Novo: StackNewCategories,
        Visualizar: StackViewCategories
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
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
        }),
        tabBarOptions: {
            activeBackgroundColor: '#042963',
            inactiveBackgroundColor: '#042963',
            activeTintColor: 'white',
            inactiveTintColor: 'gray'
        }
});

const Drawer = createDrawerNavigator({
    Agendamentos: {
        screen: SchedulesTabs,
    },
    Anos: {
        screen: CategoriesTabs,
    },

}, {
    defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#57136F'
        }
    },
    contentComponent: CustomDrawer
});

const Routes = createAppContainer(
    createSwitchNavigator({
        App: Drawer,
        Auth: StackLogin
    }, {
        initialRouteName: 'Auth'
    })
);

export default Routes;