import firebase from "./firebase";
import * as Google from 'expo-google-app-auth';

// GoogleSignin.configure({
//     scopes:['profile','email'],
// });

export default async function signInWithGoogle() {
    const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
        androidClientId: process.env.GOOGLE_AUTH_ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
    });
    // await GoogleSignin.hasPlayServices();
    // const user = await GoogleSignin.signIn();
    // const {idToken} = user;
    //const {accessToken} = await GoogleSignin.getTokens();
    if(result.type !== 'success'){
        throw new Error("user information is null");
    }
    const {idToken,accessToken} = result;
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
