import React, {useCallback, useContext} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Status} from "../../../contexts/ui";
import {COLOR} from "../../../constants/theme";
import {UiContext, UserContext} from "../../../contexts";
import {Avatar, Button, LabelValueContainer} from "../../atoms";
import {useNetworker} from "../../../lib/hooks";
import formatDate from "../../../lib/format-date";
import signOutToFirebase from "../../../lib/firebase/sign-out";
import * as LocalStore from "../../../lib/local-store";

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
        color: COLOR.BLACK,
        fontSize: 20,
        marginTop: 5,
    },
    button: {
        marginTop: 30,
    },
});

export default function UserInfo() {
    const {userState,setUserState} = useContext(UserContext);
    const {setApplicationState} = useContext(UiContext);
    const networker = useNetworker();

    const signOut = useCallback(async () => {
        await networker(async () => {
            await signOutToFirebase();
            setUserState(null);
            await LocalStore.UserInformation.clear();
            setApplicationState(Status.UN_AUTHORIZED);
        });
    },[networker,setUserState,setApplicationState]);

    const source = React.useMemo(() =>
        (userState?.photoUrl) ? {uri:userState.photoUrl} : require('../../../../assets/person.png')
        ,[]);

    if (userState === null) {
        return null;
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageIconContainer}>
                <Avatar source={source}/>
                <Text style={styles.nameText}>{userState.name}</Text>
            </View>
            <LabelValueContainer label="e-mail" value={userState.mailAddress}/>
            <LabelValueContainer label="registeredAt" value={userState.createdAt && formatDate(new Date(userState.createdAt))}/>
            <Button style={styles.button} onPress={signOut} label="Sign Out"/>
        </SafeAreaView>
    )
}
