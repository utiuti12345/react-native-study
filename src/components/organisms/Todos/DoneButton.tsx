import React from "react";
import {StyleSheet} from "react-native";
import {COLOR} from "../../../constants/theme";
import {IconButton} from "../../atoms";

const styles = StyleSheet.create({
    button: {
        backgroundColor:COLOR.PRIMARY,
    },
    done: {
        backgroundColor:COLOR.MAIN_DARK,
    },
});

export interface ToggleTodo {
    (id:string):void;
}

interface Props {
    state:{
        id:string;
        isDone?:boolean;
    },
    actions:{
        toggleTodo:ToggleTodo;
        closeRow:() => void;
    }
}

export function Component(prop:Props) {
    const {state:{id,isDone},actions:{toggleTodo,closeRow}} = prop;
    const onPress = React.useCallback(async () => {
       toggleTodo(id);
       closeRow();
    },[id,closeRow,toggleTodo]);

    return(
        <IconButton icon={isDone ? 'restore':'check'} onPress={onPress} style={isDone?styles.done:styles.button}/>
    );
}
