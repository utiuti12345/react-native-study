import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {StackCardInterpolationProps} from "@react-navigation/stack/lib/typescript/src/types";
import * as UiContext from "../../contexts/ui";
import {CHOOSE_LOGIN, HOME, INITIAL, LOADING} from "../../constants/path";
import {ChooseLogin, Home, Initial, Loading} from "../../components/pages";

const Stack = createStackNavigator();
const forFade = ({current}:StackCardInterpolationProps) => ({
   cardStyle:{
       opacity:current.progress,
   }
});

function switchingAuthStatus(status:UiContext.Status) {
    switch (status) {
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin}/>;
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={Home}/>;
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
