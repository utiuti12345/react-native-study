import * as React from "react";
import {View, StyleSheet, Text} from "react-native";
import {useRoute, RouteProp} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import {useControlledComponent} from "../../../lib/hooks";
import {Button, TextField} from "../../atoms";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textField: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});

interface TodoEditActions {
    changeTodo: (id: string, newValue: { title: string, detail: string }) => void;
}

interface Props {
    actions: TodoEditActions;
}

interface Params {
    id: string;
    isEditable: boolean;
    title: string;
    detail: string;
}

export default function Detail() {
    const {goBack} = useNavigation();
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {isEditable,title:titleInitialValue,detail:detailInitialValue} = params;

    const title = useControlledComponent(titleInitialValue);
    const detail = useControlledComponent(detailInitialValue);

    const onSubmit = React.useCallback(() =>{
        goBack();
    },[goBack]);

    return (
        <View style={styles.container}>
            <TextField label="title" value={title.value} disabled={!isEditable}
                       onChangeText={title.onChangeText} style={styles.textField}
                       />
            <TextField label="detail" value={detail.value} disabled={!isEditable}
                       onChangeText={detail.onChangeText} style={styles.textField}
            />
            {isEditable && <Button onPress={onSubmit} label="Submit" style={styles.button}/>}
        </View>
    );
}
