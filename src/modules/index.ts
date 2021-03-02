import {combineReducers} from "redux";

import * as Todos from "./todos";

export function createInitialState() {
    return{
        todos:Todos.createInitialState()
    };
}

export type Appstate = Readonly<ReturnType<typeof createInitialState>>;

export default combineReducers<Appstate>({
   todos: Todos.default,
});
