import * as admin from 'firebase-admin';
import * as firebaseAdmin from './firebase.js';
let firebaseDB;
try {
    const existingApp = admin.apps.find(app => app && app.name === 'databaseUrl');
    const dbApp = existingApp ||
        admin.initializeApp({
            credential: admin.credential.cert(firebaseAdmin),
            databaseURL: process.env.FIREBASE_DB.trim(),
        }, 'databaseUrl');
    firebaseDB = dbApp.database();
    console.log('🔥 Firebase DB connected successfully!');
}
catch (error) {
    console.error('❌ Error connecting to Firebase DB:', error);
    throw error; // Re-throw the error after logging it
}
export default firebaseDB;
