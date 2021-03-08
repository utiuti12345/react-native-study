import firebase from 'firebase';

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

