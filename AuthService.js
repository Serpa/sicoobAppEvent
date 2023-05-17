import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
    updateEmail
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: "AIzaSyDkf9uZj1EPRZfy20IEvU1NGatoh9ZSWBk",
    authDomain: "sicoob-eee3f.firebaseapp.com",
    projectId: "sicoob-eee3f",
    storageBucket: "sicoob-eee3f.appspot.com",
    messagingSenderId: "448676137538",
    appId: "1:448676137538:web:5616dbeb95c1283a74fbdb"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


const AuthService = {

    register: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await AsyncStorage.setItem('user', JSON.stringify(user)); // save user info in AsyncStorage
            return user;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (displayName, photoURL) => {
        updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: photoURL
        }).then(() => {
            return true
        }).catch((error) => {
            console.log(error.message);
            return error
        });
    },

    emailUpdate: async (email) => {
        updateEmail(auth.currentUser, email).then(() => {
            return true
        }).catch((error) => {
            console.log(error.message)
            return error.message
        });
    },

    verification: async () => {
        try {
            return await sendEmailVerification(auth.currentUser)
        } catch (e) {
            console.log(e.message)
            return e.message
        }
    },

    signOut: async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            console.log(e.message)
            return e.message
        }
    },

};

export default AuthService;