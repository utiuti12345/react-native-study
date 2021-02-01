import React from 'react';
import * as UiContext from './src/contexts/ui';
import Routes from './src/routes';

export default function App() {
    const [applicationState,setApplicationState] = React.useState(UiContext.createApplicationInitialState());
    return (
        <UiContext.Context.Provider value={{applicationState,setApplicationState}}>
            <Routes/>
        </UiContext.Context.Provider>
    );
}

