import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {COLOR} from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLOR.MAIN,
    },
    text:{
        color:COLOR.WHITE
    }
});

export default function Initial() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Initial</Text>
        </View>
    )
}
