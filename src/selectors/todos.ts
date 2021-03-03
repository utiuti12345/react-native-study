import {Appstate} from "../modules";
import {createSelector} from "reselect";

import * as Domain from "../domain/models";

function selectTodos(state:Appstate) {
    return state.todos;
}

export const getArray = createSelector([selectTodos],todos =>
   Object.values(todos).map(todo =>({
       id:todo.id,
       title:todo.title,
       detail:todo.detail,
       isDone:Domain.Todo.isDone(todo),
       createdAt:new Date(todo.createdAt).getTime(),
       updateAt:new Date(todo.updateAt).getTime(),
   })),
);

export const getTodos = createSelector([getArray],todos =>
    todos.sort((a,b) => b.createdAt - a.createdAt));
