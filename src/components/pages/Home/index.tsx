import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DETAIL, INPUT} from "../../../constants/path";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default function Home() {
    const {navigate} = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => {
                navigate(DETAIL)
            }}>
                <Text>Go To Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigate(INPUT)
            }}>
                <Text>Go To Input</Text>
            </TouchableOpacity>
        </View>
    )
}
