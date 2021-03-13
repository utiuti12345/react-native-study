import React, {useCallback} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {COLOR} from "../../../constants/theme";
import {useControlledComponent} from "../../../lib/hooks";
import {Button, dismiss, IconButton, TextField} from "../../atoms";
import {Todo} from "../../../domain/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: COLOR.MAIN,
    },
    text: {
        marginBottom: 16,
    },
    button: {
        marginTop: 20,
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 80,
        height: 80,
        borderRadius: 40,
    }
});

interface Props {
    actions: {
        addTodo: (newValues: Todo.Values) => void;
    };
}

export default function Input(props:Props) {
    const title = useControlledComponent('');
    const detail = useControlledComponent('');

    const {goBack} = useNavigation();
    const back = useCallback(() => {
        goBack();
    }, [goBack]);

    const addTodo = useCallback(() => {
        props.actions.addTodo({
            title:title.value,
            detail:detail.value,
        });

        back();
        title.onChangeText('');
        detail.onChangeText('');
    }, [back, title, detail,props.actions]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={dismiss}>
                <View style={styles.container}>
                    <IconButton icon="close" onPress={back} style={styles.iconButton}
                                size={30} iconColor={COLOR.PRIMARY}/>
                    <TextField label="Title" value={title.value} onChangeText={title.onChangeText} style={styles.text}/>
                    <TextField label="Detail" value={detail.value} onChangeText={detail.onChangeText} style={styles.text}/>
                    <Button onPress={addTodo} label="Add" style={styles.button} disabled={!title.value}/>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
