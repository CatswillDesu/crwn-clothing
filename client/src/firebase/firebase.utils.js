import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQfk04RqlnQb-w0hl96ipGO09Kbga1PB4",
    authDomain: "crwn-nd.firebaseapp.com",
    databaseURL: "https://crwn-nd.firebaseio.com",
    projectId: "crwn-nd",
    storageBucket: "",
    messagingSenderId: "714495795885",
    appId: "1:714495795885:web:9d185dfd653606d92b5c24"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export async function createUserProfileDocument(userAuth, additionalData) {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const userSnapshot = await userRef.get();
    
    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(err) {
            console.info('Error while setting new user to database!', err.message);
        }
    }
    
    return userRef;
}

export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj) ;
    })

    return await batch.commit();
}

export async function updateUserDocumentWithNewCart(userAuth, newCart) {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.id}`);

    try {
        await userRef.update({ cart: newCart })
    } catch(err) {
        console.info('Error while updating user cart!', err.message);
        throw err;
    }
}

export async function convertCollectionSnapshotToMap(collectionRef) {
    const convertedCollectionsArr = collectionRef.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    })

    const collectionsObj = convertedCollectionsArr.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})

    return collectionsObj;
}

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default firebase;