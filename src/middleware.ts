import {Middleware} from "redux";

export const functionExecutor:Middleware = store => next => action => {
    if (typeof action === 'function'){
        return action(store.dispatch,store.getState);
    }
    return next(action);
};
