import React from "react";
import firebase from "../../../lib/firebase/firebase";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Context as UserContext} from '../../../contexts/user';
import {Context as UiContext, Status} from '../../../contexts/ui';

import {Todos} from "../../../domain/models";
import * as TodosRepository from "../../../domain/repositories/todos";
import * as LocalStore from "../../../lib/local-store/index";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface SetTodo {
    (todos:Todos.Model):void;
}

interface Props {
    actions:{
        setTodos:SetTodo;
    }
}

function useUserInformation(setTodos:SetTodo) {
    const {setUserState} = React.useContext(UserContext);
    const {setError,setApplicationState} = React.useContext(UiContext);

    async function navigateNextScreen() {
        const isOpened = await LocalStore.InitialLaunch.isInitialLaunch();
        if (!isOpened){
            setApplicationState(Status.FIRST_OPEN);
            return ;
        }
        setApplicationState(Status.UN_AUTHORIZED);
    }

    function initialFirebaseAuthentication() {
        return new Promise((resolve,reject) => {
           firebase.auth().onAuthStateChanged(user =>{
              if (!user){
                  setApplicationState(Status.UN_AUTHORIZED);
                  return;
              }
              TodosRepository.getAll(user.uid)
                  .then(todos => {
                      setTodos(todos);
                      setApplicationState(Status.AUTHORIZED);
                      resolve();
                  })
                  .catch(e => {
                      reject(e);
                  })
           });
        });
    }

    async function retrieveUserInformation() {
        try {
            const userInformation = await LocalStore.UserInformation.retrieve();

            if (!userInformation){
                await navigateNextScreen();
                return ;
            }

            setUserState(userInformation);
            await initialFirebaseAuthentication();
        }catch (e) {
            setError(e);
        }
    }

    return retrieveUserInformation;
}

export default function Loading(props:Props) {
    const {setTodos} = props.actions;
    const retrieveUserInformation = useUserInformation(setTodos);

    React.useEffect(() => {
        retrieveUserInformation();
    },[retrieveUserInformation]);

    return(
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )
}
