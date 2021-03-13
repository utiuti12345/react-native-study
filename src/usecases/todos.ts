import {Dispatch} from "redux";
import firebase from "../lib/firebase/firebase";

import {Todo} from "../domain/models";
import * as TodosRepository from "../domain/repositories/todos";
import {add, remove, toggle, update} from "../modules/todos";
import store from "../store";
import {AppState} from "../modules";

export function addAndSync(userId:string,newValues:Todo.Values) {
    return async function(dispatch:Dispatch){
        const newTodo = Todo.factory(newValues);
        dispatch(add(newTodo));
        TodosRepository.add(userId,newTodo);
    };
}

export function removeAndSync(userId:string,id:string) {
    return async function(dispatch:Dispatch){
        dispatch(remove(id));
        TodosRepository.remove(userId,id);
    };
}

export function toggleAndSync(userId:string,id:string) {
    return async function(dispatch:Dispatch,getState:() => AppState){
        dispatch(toggle(id));
        const {completedAt:newValue,title} = getState().todos[id];
        // const eventName = newValue?"complete_todo":"uncomplete_todo";
        // await firebase.analytics().logEvent(eventName,{
        //     id:id,
        //     name:title,
        // });
        TodosRepository.toggle(userId,id,newValue);
    }
}

export function editAndSync(userId:string,id:string,newValues:Todo.Values) {
    return async function(dispatch:Dispatch){
        dispatch(update(id,newValues));
        TodosRepository.change(userId,id,newValues);
    };
}


