import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ITodoState} from "../interface/interface";

const styles = StyleSheet.create({
    isDone: {},
    unDone:{},
    text:{},
    doneText:{},
});

export default function Todo(props:ITodoState) {
    const {
        isDone,
        text
    } = props;
    return(
        <View style={isDone ? styles.isDone : styles.unDone}>
            {isDone && <Text style={styles.doneText}>Done</Text>}
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}
