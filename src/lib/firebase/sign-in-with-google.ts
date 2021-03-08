import firebase from "./firebase";
import {GoogleSignin} from "@react-native-community/google-signin"

GoogleSignin.configure({
    scopes:['profile','email'],
});

export default async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();
    const {idToken} = user;
    const {accessToken} = await GoogleSignin.getTokens();
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken,accessToken);

    const response = await firebase.auth().signInWithCredential(credential);

    if(!response.user){
        throw new Error("user information is null");
    }

    const {
        uid:id,
        displayName:name,
        email:mailAddress,
        photoURL:photoUrl,
        metadata:{creationTime,lastSignInTime},
    } = response.user;
    const createdAt = creationTime ? new Date(creationTime).getTime():null;
    const lastLoginAt = lastSignInTime ? new Date(lastSignInTime).getTime():null;

    return {
        id,
        name,
        mailAddress,
        photoUrl,
        createdAt,
        lastLoginAt
    };
}
