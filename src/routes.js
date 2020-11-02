import React from 'react';
import { TouchableOpacity } from 'react-native';
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
import ViewCourses from './pages/Courses/ViewCourses';
import NewCourses from './pages/Courses/NewCourses';
import ViewCampus from './pages/Campus/ViewCampus';
import NewCampus from './pages/Campus/NewCampus';
import ViewEquipaments from './pages/Equipaments/ViewEquipaments';
import NewEquipaments from './pages/Equipaments/NewEquipaments';
import ViewPlaces from './pages/Places/ViewPlaces';
import NewPlaces from './pages/Places/NewPlaces';
import ViewUsers from './pages/Users/ViewUsers';
import NewUsers from './pages/Users/NewUsers';
import CustomDrawer from './components/CustomDrawer';

const headerOptions = {
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: '#042963'
}

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
        headerStyle: headerOptions
        
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
        headerStyle: headerOptions
        
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
        headerStyle: headerOptions
        
    }
});

const StackNewCategories = createStackNavigator({
    NewCategories: {
        screen: NewCategories,
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
        headerStyle: headerOptions
        
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

const StackViewCourses = createStackNavigator({
    Visualizar: {
        screen: ViewCourses,
        navigationOptions: ({ navigation }) => ({
            title: 'Cursos',
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
        headerStyle: headerOptions
        
    }
});

const StackNewCourses = createStackNavigator({
    NewCourses: {
        screen: NewCourses,
        navigationOptions: ({ navigation }) => ({
            title: 'Cursos',
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
        headerStyle: headerOptions
        
    }
});

const CoursesTabs = createBottomTabNavigator({
        Novo: StackNewCourses,
        Visualizar: StackViewCourses
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

const StackViewCampus = createStackNavigator({
    Visualizar: {
        screen: ViewCampus,
        navigationOptions: ({ navigation }) => ({
            title: 'Campus',
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
        headerStyle: headerOptions
        
    }
});

const StackNewCampus = createStackNavigator({
    NewCampus: {
        screen: NewCampus,
        navigationOptions: ({ navigation }) => ({
            title: 'Campus',
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
        headerStyle: headerOptions
        
    }
});

const CampusTabs = createBottomTabNavigator({
        Novo: StackNewCampus,
        Visualizar: StackViewCampus
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

const StackViewEquipaments = createStackNavigator({
    Visualizar: {
        screen: ViewEquipaments,
        navigationOptions: ({ navigation }) => ({
            title: 'Equipamentos',
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
        headerStyle: headerOptions
        
    }
});

const StackNewEquipaments = createStackNavigator({
    NewEquipaments: {
        screen: NewEquipaments,
        navigationOptions: ({ navigation }) => ({
            title: 'Equipamentos',
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
        headerStyle: headerOptions
        
    }
});

const EquipamentsTabs = createBottomTabNavigator({
        Novo: StackNewEquipaments,
        Visualizar: StackViewEquipaments
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

const StackViewPlaces = createStackNavigator({
    Visualizar: {
        screen: ViewPlaces,
        navigationOptions: ({ navigation }) => ({
            title: 'Salas',
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
        headerStyle: headerOptions
        
    }
});

const StackNewPlaces = createStackNavigator({
    NewPlaces: {
        screen: NewPlaces,
        navigationOptions: ({ navigation }) => ({
            title: 'Salas',
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
        headerStyle: headerOptions
        
    }
});

const PlacesTabs = createBottomTabNavigator({
        Novo: StackNewPlaces,
        Visualizar: StackViewPlaces
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

const StackViewUsers = createStackNavigator({
    Visualizar: {
        screen: ViewUsers,
        navigationOptions: ({ navigation }) => ({
            title: 'Usuários',
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
        headerStyle: headerOptions
        
    }
});

const StackNewUsers = createStackNavigator({
    NewUsers: {
        screen: NewUsers,
        navigationOptions: ({ navigation }) => ({
            title: 'Usuários',
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
        headerStyle: headerOptions
        
    }
});

const UsersTabs = createBottomTabNavigator({
        Novo: StackNewUsers,
        Visualizar: StackViewUsers
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
    Campus: {
        screen: CampusTabs,
    },
    Cursos: {
        screen: CoursesTabs,
    },
    Equipamentos: {
        screen: EquipamentsTabs,
    },
    Salas: {
        screen: PlacesTabs,
    },
    Usuarios: {
        screen: UsersTabs,
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