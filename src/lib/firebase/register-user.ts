import auth from "@react-native-firebase/auth";

export default async function registerUser(mailAddress:string,password:string) {
    const response = await auth().createUserWithEmailAndPassword(mailAddress,password);

    if (!response.user){
        throw new Error("user information is null");
    }

    const {
        uid:id,
        displayName:name,
        photoURL:photoUrl,
        metadata:{creationTime,lastSignInTime},
    } = response.user;
    const createdAt = creationTime ? new Date(creationTime).getTime():null;
    const lastLoginAt = lastSignInTime ? new Date(lastSignInTime).getTime():null;

    return {
        id,
        name,
        photoUrl,
        createdAt,
        lastLoginAt
    };
}
