import React from "react";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Status} from "../../../contexts/ui";
import {UiContext, UserContext} from "../../../contexts";
import {Todos} from "../../../domain/models";
import {useControlledComponent, useNetworker} from "../../../lib/hooks";
import {Button, dismiss, TextField} from "../../atoms";
import * as TodosRepostory from "../../../domain/repositories/todos";
import * as LocalStore from "../../../lib/local-store";
import signInWithPasswordToFirebase from "../../../lib/firebase/sign-in-with-password";
import SignInWithGoogle from "./SignInWithGoogle";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        justifyContent:'center',
    },
    text:{
        marginVertical:20,
    },
    button:{
        marginTop:50,
    },
    textContainer:{
        flex:1,
        justifyContent: 'center',
    },
    buttonContainer:{
        flex:1,
        justifyContent:'flex-start',
    },
});

interface Props {
    actions: {
        setTodos: (todos: Todos.Model) => void;
    };
}

export default function SignIn(props:Props) {
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);
    const networker = useNetworker();
    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');
    const {setTodos} = props.actions;

    const signInWithPassword = React.useCallback(async () => {
       await networker(async () => {
          const userInformation = await signInWithPasswordToFirebase(mailAddress.value,password.value);
          setUserState(userInformation);
          setApplicationState(Status.AUTHORIZED);
          await LocalStore.UserInformation.save(userInformation);

          const todos = await TodosRepostory.getAll(userInformation.id);
          setTodos(todos);
       });
    },[mailAddress.value,password.value,setApplicationState,networker,setUserState,setTodos]);

    return(
        <TouchableWithoutFeedback onPress={dismiss}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
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
                </View>
                <View style={styles.buttonContainer}>
                    <SignInWithGoogle {...props}/>
                    <Button
                        onPress={signInWithPassword}
                        style={styles.button}
                        label="SignIn"
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
