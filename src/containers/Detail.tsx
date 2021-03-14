import React, {useContext} from "react";
import {useDispatch} from "react-redux";
import {Detail} from "../components/pages";
import {Todo} from "../domain/models";
import * as Todos from "../usecases/todos";
import {UserContext} from "../contexts";

export default function ConnectedDetail() {
    const {userState} = useContext(UserContext);

    const dispatch = useDispatch();
    const actions = React.useMemo(() => {
        if (userState) {
            return {
                changeTodo(id: string, todoValues: Todo.Values) {
                    dispatch(Todos.editAndSync(userState.id, id, todoValues))
                },
            };
        } else {
            return null;
        }

    }, [userState, dispatch]);

    if (!actions) {
        return null;
    }

    return <Detail actions={actions}/>
}
