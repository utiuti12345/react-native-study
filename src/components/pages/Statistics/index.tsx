import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DETAIL} from "../../../constants/path";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default function Statistics() {
    const {navigate} = useNavigation();
    return(
        <View style={styles.container}>
            <Text>Statistics</Text>
            <TouchableOpacity onPress={() => {navigate(DETAIL)}}>
                <Text>Go To Detail</Text>
            </TouchableOpacity>
        </View>
    )
}
