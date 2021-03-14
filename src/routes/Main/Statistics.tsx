import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, STATISTICS} from "../../constants/path";
import {Statistics} from "../../components/pages";
import {Detail} from '../../containers';
import {HeaderLeft, headerStyle, headerTintColor} from "../Header";
import {COLOR} from "../../constants/theme";

const cardStyle = {
    backgroundColor: COLOR.MAIN,
};
const Stack = createStackNavigator();

function StatisticsNavigator() {
    return(
        <Stack.Navigator initialRouteName={STATISTICS} screenOptions={{cardStyle, headerStyle, headerTintColor}}>
            <Stack.Screen name={STATISTICS} component={Statistics} options={{headerLeft: () => <HeaderLeft/>}}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}

export default StatisticsNavigator;
