import React, {useCallback} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Status} from "../../../contexts/ui";
import {COLOR} from "../../../constants/theme";
import {UiContext} from "../../../contexts";
import {Avatar, Button, LabelValueContainer} from "../../atoms";
import formatDate from "../../../lib/format-date";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    nameText: {
        color: COLOR.WHITE,
        fontSize: 20,
        marginTop: 5,
    },
    button: {
        marginTop: 30,
    },
});

const useState = {
    name:'test',
    createdAt:'2020/01/01',
    mailAddress:'test@aaa.com',
};

export default function UserInfo() {
    const {setApplicationState} = React.useContext(UiContext);
    const signOut = useCallback(() =>{
        setApplicationState(Status.UN_AUTHORIZED);
    },[setApplicationState]);

    const source = React.useMemo(() => require('../../../../assets/person.png'),[]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageIconContainer}>
                <Avatar source={source}/>
                <Text style={styles.nameText}>{useState.name}</Text>
            </View>
            <LabelValueContainer label="e-mail" value={useState.mailAddress}/>
            <LabelValueContainer label="registeredAt" value={useState.createdAt && formatDate(new Date(useState.createdAt))}/>
            <Button style={styles.button} onPress={signOut} label="Sign Out"/>
        </SafeAreaView>
    )
}
