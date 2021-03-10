import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    appid: process.env.FIREBASE_APP_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

try {
    firebase.initializeApp(firebaseConfig);
} catch(e) {
    console.log(e);
}

export default firebase;

