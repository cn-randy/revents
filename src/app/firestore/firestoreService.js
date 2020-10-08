import firebase from '../config/firebase'
import cuid from "cuid";
const db = firebase.firestore()

export const dataFromSnapshot = (snapshot) => {
    if (!snapshot.exists) {
        return undefined
    }

    const data = snapshot.data()
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate()
            }
        }
    }
    return {
        ...data,
        id: snapshot.id
    }
}

export const listenTotEventsFromFirestore = () => {
    return db.collection('events').orderBy('date')
}

export const listenToEventFromFirestore = (eventId) => {
    return db.collection('events').doc(eventId)
}

export const addEventToFirestore = (event) => {
    return db.collection('events').add({
        ...event,
        hostedBy: 'Wilma',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Wilma',
            photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'

        })
    })
}

export const updateEventInFirestore = (event) => {
    return db.collection('events').doc(event.id).update(event)
}

export const deleteEvenetInFirestore = (eventId) => {
    return db.collection('events').doc(eventId).delete()
}

export const cancelEventToggle = (event) => {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled,
    })
}

/**
 * Register user profile.
 * Firebase maintains a global collection of authenticated users which stores
 * the email and password only when sign in by email and password is enabled.
 * Profile data is stored in the firestore database separately.
 *
 * @calledBy firebaseService::registerInFirebase
 *
 * @param user
 *
 * @returns {user}
 */
export const setUserProfileData = (user) => {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const getUserProfile = (userId) => {
    return db.collection('users').doc(userId)
}

export const updateUserProfile = async (profile) => {
    const user = firebase.auth().currentUser
    try {
        if (user.displayName !== profile.displayName ) {
            await user.updateProfile({
                displayName: profile.displayName,
            })
        }

        return await db.collection(('users')).doc(user.uid).update(profile)
    } catch (error) {
        throw error
    }
}

export const updateUserProfilePhoto = async (downloadURL, filename) => {
    const user = firebase.auth().currentUser
    const userDocRef = db.collection('users').doc(user.uid)

    try {
        const userDoc = await userDocRef.get()
        if (!userDoc.data().photoURL) {
            await db.collection('users').doc(user.uid).update({
                photoURL: downloadURL
            })
            await user.updateProfile({
                photoURL: downloadURL
            })
        }

        return await db.collection('users').doc(user.uid).collection('photos').add({
            name: filename,
            URL: downloadURL,
        })
    } catch (error) {
        throw error
    }
}

export function getUserPhotos(userUid) {
    return db.collection('users').doc(userUid).collection('photos');
}

export const setMainPhoto = async (photo) => {
    const user = firebase.auth().currentUser

    try {
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.URL
        })

        return await user.updateProfile({
            photoURL: photo.URL
        })

    } catch (error) {
        throw error
    }
}

export const deletePhotoFromCollection = (photoId) => {
    const userUid = firebase.auth().currentUser.uid
    return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}