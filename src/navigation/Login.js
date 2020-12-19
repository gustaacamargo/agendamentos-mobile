import { createStackNavigator } from "react-navigation-stack";
import Login from "../pages/Login/Login";

export const StackLogin = createStackNavigator({
    Login: {
        screen: Login,
    },
}, {
    defaultNavigationOptions: {
        headerShown: false,
    }
});