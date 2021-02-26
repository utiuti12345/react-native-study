import React from "react";
import {useSelector} from "react-redux";

import Component from "../components/Component";
import * as Todos from "../domain/todos";

export function ConnectedComponent() {
    const completedTodos = useSelector(Todos.getCompletedTodos);
    const numofCompleted = useSelector(Todos.getNumofTodos);
    return <Component todos={}/>
}
