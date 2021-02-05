import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Context, Status} from "../../../contexts/ui";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default function SignIn() {
    const {setApplicationState} = React.useContext(Context);
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setApplicationState(Status.AUTHORIZED)}>
                <Text>SignIn</Text>
            </TouchableOpacity>
        </View>
    )
}
