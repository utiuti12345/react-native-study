import {Dispatch} from "redux";

import {Todo} from "../domain/models";
import * as TodoRepository from "../domain/repositories/todos";
import {add, remove, toggle, update} from "../modules/todos";
import store from "../store";

export function addAndSync(userId:string,newValues:Todo.Values) {
    return async function(dispatch:Dispatch){
        const newTodo = Todo.factory(newValues);
        dispatch(add(newTodo));
        TodoRepository.add(userId,newTodo);
    };
}

export function removeAndSync(userId:string,id:string) {
    return async function(dispatch:Dispatch){
        dispatch(remove(id));
        TodoRepository.remove(userId,id);
    };
}

export function toggleAndSync(userId:string,id:string) {
    return async function(dispatch:Dispatch){
        dispatch(toggle(id));
        const newValue = store.getState().todos[id].createdAt;
        TodoRepository.toggle(userId,id,newValue);
    };
}

export function editAndSync(userId:string,id:string,newValues:Todo.Values) {
    return async function(dispatch:Dispatch){
        dispatch(update(id,newValues));
        TodoRepository.change(userId,id,newValues);
    };
}
