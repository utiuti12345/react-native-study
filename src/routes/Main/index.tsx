import React from "react";
import {createStackNavigator, StackCardInterpolationProps} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import * as UiContext from "../../contexts/ui";
import {
    CHOOSE_LOGIN,
    HOME,
    INITIAL,
    INPUT,
    LOADING,
    SIGN_IN,
    SIGN_UP,
    STATISTICS,
    USER_INFO
} from "../../constants/path";
import {ChooseLogin, Initial, Input, Loading, SignIn, SignUp, UserInfo} from "../../components/pages";
import Home from './Home';
import Statistics from './Statistics';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeDrawer = createDrawerNavigator();
const StatisticsDrawer = createDrawerNavigator();
const ModalStack = createStackNavigator();
const ChooseLoginStack = createStackNavigator();
const forFade = ({current}: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    }
});

function HomeWithDrawer() {
    return (
        <HomeDrawer.Navigator initialRouteName={HOME}>
            <HomeDrawer.Screen name={HOME} component={Home}/>
            <HomeDrawer.Screen name={USER_INFO} component={UserInfo}/>
        </HomeDrawer.Navigator>
    )
}

function StatisticsWithDrawer() {
    return (
        <StatisticsDrawer.Navigator initialRouteName={STATISTICS}>
            <StatisticsDrawer.Screen name={STATISTICS} component={Statistics}/>
            <StatisticsDrawer.Screen name={USER_INFO} component={UserInfo}/>
        </StatisticsDrawer.Navigator>
    )
}

function TabRoutes() {
    return (
        <Tab.Navigator initialRouteName={HOME} screenOptions={(props: any) => {
            const routeName = getFocusedRouteNameFromRoute(props.route);
            return {
                tabBarVisible: routeName !== USER_INFO
            }
        }}>
            <Tab.Screen name={HOME} component={HomeWithDrawer}/>
            <Tab.Screen name={STATISTICS} component={StatisticsWithDrawer}/>
        </Tab.Navigator>
    )
}

function TabWithModalRoutes(){
    return(
        <ModalStack.Navigator mode="modal" headerMode="none">
            <Tab.Screen name={HOME} component={TabRoutes}/>
            <Tab.Screen name={INPUT} component={Input}/>
        </ModalStack.Navigator>
    )
}

function ChooseLoginStackNavigator() {
    return(
        <ChooseLoginStack.Navigator initialRouteName={CHOOSE_LOGIN}>
            <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin}/>
            <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn}/>
            <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp}/>
        </ChooseLoginStack.Navigator>
    )
}

function switchingAuthStatus(status: UiContext.Status) {
    switch (status) {
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginStackNavigator}/>;
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabWithModalRoutes}/>;
        default:
            return <Stack.Screen name={INITIAL} component={Initial}/>
    }
}

function AuthWithRoutes() {
    const uiContext = React.useContext(
        UiContext.Context
    );

    return (
        <Stack.Navigator initialRouteName={LOADING} headerMode="none" screenOptions={{cardStyleInterpolator: forFade}}>
            {uiContext.applicationState !== UiContext.Status.LOADING ? (
                switchingAuthStatus(uiContext.applicationState)
            ) : (
                <Stack.Screen name={LOADING} component={Loading}/>
            )}
        </Stack.Navigator>
    )
}

export default AuthWithRoutes;
