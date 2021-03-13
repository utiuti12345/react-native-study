import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, HOME} from "../../constants/path";
import {Detail} from "../../components/pages";
import {Home} from '../../containers';
import {HeaderLeft, headerStyle, headerTintColor} from "../Header";
import {COLOR} from "../../constants/theme";

const cardStyle = {
    backgroundColor: COLOR.MAIN,
};

const Stack = createStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator initialRouteName={HOME} screenOptions={{cardStyle, headerStyle, headerTintColor}}>
            <Stack.Screen name={HOME} component={Home} options={{headerLeft: () => <HeaderLeft/>}}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}

export default HomeNavigator;
