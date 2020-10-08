import firebase from "../config/firebase";
import {setUserProfileData} from "./firestoreService";
import {toast} from "react-toastify";

export const signinWithEmail = (creds) => {
    return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
}

export const signOutFirebase = () => {
    return firebase.auth().signOut()
}

/**
 * Register user
 * First a new user is added tp the firebase authenticated users collection
 * which stores email and password only.
 * Second The user profile is created in the firestore database with all
 * relevant user data.
 *
 * @calledBy RegisterForm
 *
 * @param creds
 *
 * @returns {user}
 */
export const registerInFirebase = async (creds) => {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
        await result.user.updateProfile({displayName: creds.displayName})
        return await setUserProfileData(result.user)
    } catch (error) {
        throw error
    }
}

export const socialLogin = async (selectedProvider) => {
    let provider
    if (selectedProvider === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider()
    }

    if (selectedProvider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider()
    }

    try {
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result)
        if (result.additionalUserInfo.isNewUser) {
            await setUserProfileData(result.user)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

export const updateUserPassword = (creds) => {
    const user = firebase.auth().currentUser
    return user.updatePassword(creds.newPassword1)
}

export const uploadToFirebaseStorage = (file, filename) => {
    const user = firebase.auth().currentUser
    const storageRef = firebase.storage().ref()
    return storageRef.child(`${user.uid}/user_images/${filename}`).put(file)
}

export const deleteFromFirebaseStorage = (filename) => {
    const userUid = firebase.auth().currentUser.uid
    const storageRef = firebase.storage().ref()
    const photoRef = storageRef.child(`${userUid}/user_images/${filename}`)
    return photoRef.delete()
}