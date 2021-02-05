import React from "react";
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SIGN_IN, SIGN_UP} from "../../../constants/path";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default function ChooseLogin() {
    const { navigate } = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate(SIGN_IN)}>
                <Text>Go To SignIn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(SIGN_UP)}>
                <Text>Go To SignUp</Text>
            </TouchableOpacity>
            <Text>ChooseLogin</Text>
        </View>
    )
}
