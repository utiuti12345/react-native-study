import React, {useContext} from "react";

import {Todo} from "../domain/models";
import * as Todos from "../usecases/todos";
import {useDispatch} from "react-redux";
import {UserContext} from "../contexts";
import {Input} from "../components/pages";

export default function ConnectedInput() {
    const {userState} = useContext(UserContext);

    const dispatch = useDispatch();
    const actions = React.useMemo(() =>{
        if(userState){
            return {
                addTodo(newValues:Todo.Values){
                    dispatch(Todos.addAndSync(userState.id,newValues))
                },
            };
        }else {
            return null;
        }
    }, [userState, dispatch]);

    if(!actions){
        return null;
    }

    return <Input actions={actions}/>
}
