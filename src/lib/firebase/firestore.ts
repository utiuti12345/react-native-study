import {firestore} from "firebase";

export default function getFirestore(uid:string) {
    return firestore()
        .collection('users')
        .doc(uid)
        .collection('todos');
}
