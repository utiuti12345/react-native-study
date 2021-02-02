import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {StackCardInterpolationProps} from "@react-navigation/stack/lib/typescript/src/types";
import * as UiContext from "../../contexts/ui";
import {CHOOSE_LOGIN, HOME, INITIAL, LOADING, STATISTICS} from "../../constants/path";
import {ChooseLogin, Initial, Loading} from "../../components/pages";
import Home from './Home';
import Statistics from './Statistics';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const forFade = ({current}:StackCardInterpolationProps) => ({
   cardStyle:{
       opacity:current.progress,
   }
});

function TabRoutes() {
    return(
        <Tab.Navigator initialRouteName={HOME}>
            <Tab.Screen name={HOME} component={Home}/>
            <Tab.Screen name={STATISTICS} component={Statistics}/>
        </Tab.Navigator>
    )
}

function switchingAuthStatus(status:UiContext.Status) {
    switch (status) {
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin}/>;
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabRoutes}/>;
        default:
            return <Stack.Screen name={INITIAL} component={Initial} />
    }
}

function AuthWithRoutes() {
    const uiContext = React.useContext(
        UiContext.Context
    );

    return(
        <Stack.Navigator initialRouteName={LOADING} headerMode="none" screenOptions={{cardStyleInterpolator:forFade}}>
            {uiContext.applicationState !== UiContext.Status.LOADING ? (
                switchingAuthStatus(uiContext.applicationState)
            ):(
                <Stack.Screen name={LOADING} component={Loading}/>
            )}
        </Stack.Navigator>
    )
}

export default AuthWithRoutes;
