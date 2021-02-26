import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import appReducer, {createInitialState} from './modules/async';

const store = createStore(appReducer,createInitialState(), applyMiddleware(thunk));
