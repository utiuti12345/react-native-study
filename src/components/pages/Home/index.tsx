import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DETAIL, INPUT} from "../../../constants/path";
import {COLOR} from "../../../constants/theme";
import Todos, {Todo,State as TodoState} from "../../organisms/Todos";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        position:'absolute',
        bottom:32,
        right:32,
        width:48,
        height:48,
        backgroundColor:COLOR.MAIN_DARK,
        borderRadius:24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{
            width: 3,
            height: 3,
        },
        shadowOpacity:0.29,
        shadowRadius:4.65,
        elevation:7,
    }
});

interface Props {
    todos:TodoState;
    actions:{
        toggleTodo:Todo.DoneButton.ToggleTodo;
        removeTodo:Todo.DeleteButton.RemoveTodo;
    };
}

export default function Home(props:Props) {
    const {navigate} = useNavigation();
    const onPress = React.useCallback(() => {
        navigate(INPUT)
    },[navigate]);
    const gotoDetail = React.useCallback((state:Todo.State,isEditable:boolean) => {
            navigate(DETAIL,{...state,isEditable});
    },[navigate]);
    const actions = React.useMemo(() => ({
        ...props.actions,
        gotoDetail,
    })
    ,[gotoDetail,props.actions]);

    return (
        <View style={styles.container} testID={testIDs.HOME}>
            <Todos isEditable todos={props.todos} actions={actions}/>
            <TouchableOpacity onPress={onPress} style={styles.button} testID={testIDs.TODO_OPEN_INPUT_BUTTON}>
                <Icon color={COLOR.PRIMARY} size={24} name="plus"/>
            </TouchableOpacity>
        </View>
    )
}
