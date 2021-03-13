import React from 'react';
import {Provider} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context";

import store from "./src/store";
import * as UiContext from './src/contexts/ui';
import * as NetworkContext from './src/contexts/network';
import * as UserContext from './src/contexts/user';
import Routes from './src/routes';
import ErrorPanel from "./src/components/molecules/ErrorPanel";
import NetworkPanel from "./src/components/molecules/NetworkPanel";
import {Snackbar} from "react-native-paper";

export default function App() {
    const [applicationState,setApplicationState] = React.useState(UiContext.createApplicationInitialState());
    const [error,setError] = React.useState(UiContext.createErrorInitialState());
    const [snackbar,setSnackbar] = React.useState(UiContext.createSnackbarInitialState());
    const [userState,setUserState] = React.useState(UserContext.createInitialState());

    const [networkState,dispatchNetworkActions] = React.useReducer(
        NetworkContext.reducer,
        NetworkContext.createInitialState(),
    );


    const onDismiss = React.useCallback(() => {
        setSnackbar(UiContext.createSnackbarInitialState());
    },[]);

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <UiContext.Context.Provider value={{error,setError,snackbar,setSnackbar,applicationState,setApplicationState}}>
                    <NetworkContext.Context.Provider value={{networkState,dispatchNetworkActions}}>
                        <UserContext.Context.Provider value={{userState,setUserState}}>
                            <Routes/>
                            <NetworkPanel/>
                            <ErrorPanel/>
                            <Snackbar
                                visible={snackbar.visible}
                                onDismiss={onDismiss}
                                action={{label:snackbar.label,onPress:onDismiss}}
                            >
                                {snackbar.message}
                            </Snackbar>
                        </UserContext.Context.Provider>
                    </NetworkContext.Context.Provider>
                </UiContext.Context.Provider>
            </SafeAreaProvider>
        </Provider>
    );
}
