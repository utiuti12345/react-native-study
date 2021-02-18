import React from "react";
import {StyleSheet} from "react-native";
import {COLOR} from "../../../constants/theme";
import {IconButton} from "../../atoms";

const styles = StyleSheet.create({
    button:{
        backgroundColor:COLOR.CAUTION,
    }
});

export interface RemoveTodo {
    (id:string):void;
}

interface Props {
    state:{
        id:string;
    };
    actions:{
        removeTodo:RemoveTodo;
    };
}

export function Component(props:Props) {
    const {state:{id},actions:{removeTodo}} = props;

    const onPress = React.useCallback(() => {
        removeTodo(id);
    },[id,removeTodo]);

    return(
        <IconButton icon="delete" onPress={onPress} style={styles.button}/>
    )
}
