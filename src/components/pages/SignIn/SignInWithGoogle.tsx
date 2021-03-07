import React from "react";
import {Status} from "../../../contexts/ui";
import {Button} from "../../atoms";
import {Todos} from "../../../domain/models";
import {useControlledComponent, useNetworker} from "../../../lib/hooks";
import {UiContext, UserContext} from "../../../contexts";
import * as TodosRepostory from "../../../domain/repositories/todos";
import * as LocalStore from "../../../lib/local-store";
import signInWithGoogleToFirebase from "../../../lib/firebase/sign-in-with-google";

interface Props {
    actions: {
        setTodos: (todos: Todos.Model) => void;
    };
}

export default function SignInWithGoogle(props:Props) {
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);
    const networker = useNetworker();
    const {setTodos} = props.actions;

    const signInWithGoogle = React.useCallback(async () =>{
       await networker(async () => {
          const userInformation = await signInWithGoogleToFirebase();
          setUserState(userInformation);
          setApplicationState(Status.AUTHORIZED);
          await LocalStore.UserInformation.save(userInformation);

           const todos = await TodosRepostory.getAll(userInformation.id);
           setTodos(todos);
       });
    },[setApplicationState,networker,setUserState,setTodos]);

    return(
        <Button onPress={signInWithGoogle} icon="google" label="Sign In With Google"/>
    )
}
