import firebase, {firestore} from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.databaseURL,
    projectId: process.env.PROJECT_IDW,
    storageBucket: process.env.STORAGE_BUCKET,
    appid: process.env.APP_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

try {
    firebase.initializeApp(firebaseConfig);
} catch(e) {
    console.log(e);
}

export default firebase;

