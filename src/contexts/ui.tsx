import React from "react";

export enum Status {
    LOADING = 'loading',
    FIRST_OPEN = 'firstOpen',
    UN_AUTHORIZED = 'unAuthorized',
    AUTHORIZED = 'authorized',
}

export function createApplicationInitialState(): Status{
    return Status.LOADING;
}

type ErrorState = Error | null;
export function createErrorInitialState():ErrorState {
    return null;
}

export function createSnackbarInitialState() {
    return{
        visible:false,
        message:'',
        label:'Done',
    };
}

type SnackbarState = ReturnType<typeof createSnackbarInitialState>;

export const Context = React.createContext({
    error:createErrorInitialState(),
    setError:(_:ErrorState) => {},
    snackbar:createSnackbarInitialState(),
    setSnackbar:(_:SnackbarState) => {},
    applicationState:createApplicationInitialState(),
    setApplicationState:(_:Status) => {},
});
