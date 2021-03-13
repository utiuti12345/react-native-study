import firebase from "./firebase";
const firestore = firebase.firestore();

export default function getFirestore(uid:string) {
    return firestore
        .collection('users')
        .doc(uid)
        .collection('todos');
}
