import firebase from "./firebase";

export default async function signOut() {
    await firebase.auth().signOut();
}
