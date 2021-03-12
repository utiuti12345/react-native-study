import React, {useCallback} from "react";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Context, Status} from "../../../contexts/ui";
import {useControlledComponent, useNetworker} from "../../../lib/hooks";
import {Button, dismiss, TextField} from "../../atoms";
import registerUserToFirebase from '../../../lib/firebase/register-user';
import * as TodosRepostory from "../../../domain/repositories/todos";
import * as LocalStore from "../../../lib/local-store";
import {UserContext} from "../../../contexts";
import {Todos} from "../../../domain/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        marginVertical: 20,
    },
    button: {
        marginTop: 20,
    }
});

interface Props {
    actions: {
        setTodos: (todos: Todos.Model) => void;
    };
}

export default function SignUp(props:Props) {
    const { setUserState } = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(Context);
    const networker = useNetworker();
    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');
    const {setTodos} = props.actions;

    const registerUser = useCallback(async () =>{
        await networker(async () =>{
           const userInformation = await registerUserToFirebase(mailAddress.value,password.value);
           setUserState(userInformation);
           setApplicationState(Status.AUTHORIZED);
           await LocalStore.UserInformation.save(userInformation);

           const todos = await TodosRepostory.getAll(userInformation.id);
           setTodos(todos);
        });
    },[mailAddress.value,password.value,setApplicationState,networker,setUserState,setTodos]);

    return (
        <TouchableWithoutFeedback onPress={dismiss}>
            <View style={styles.container}>
                <TextField
                    label="email"
                    value={mailAddress.value}
                    onChangeText={mailAddress.onChangeText}
                    style={styles.text}
                    autoCompleteType="email"
                />
                <TextField
                    label="password"
                    value={password.value}
                    onChangeText={password.onChangeText}
                    style={styles.text}
                    autoCompleteType="password"
                    secureTextEntry={true}
                />
                <Button
                    onPress={registerUser}
                    style={styles.button}
                    label="Register"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}
