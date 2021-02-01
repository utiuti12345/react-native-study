import React from "react";
import MainRoutes from "./Main";
import {NavigationContainer} from "@react-navigation/native";

export default function LoggingRoutes() {
    return (
        <NavigationContainer>
            <MainRoutes/>
        </NavigationContainer>
    )
}
