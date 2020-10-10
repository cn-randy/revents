import firebase from '../config/firebase'

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

export const listenToEventsFromFirestore = (predicate) => {
    const user = firebase.auth().currentUser
    let eventsRef = db.collection('events').orderBy('date')
    console.log(predicate.get('filter'))
    switch (predicate.get('filter')) {
        case 'isGoing':
            return eventsRef
                .where('attendeeIds', 'array-contains', user.uid)
                .where('date', '>=', predicate.get('startDate'))
        case 'isHost':
            return eventsRef
                .where('hostUid', '==', user.uid)
                .where('date', '>=', predicate.get('startDate'))
        default:
            return eventsRef
                .where('date', '>=', predicate.get('startDate'))
    }
}

export const listenToEventFromFirestore = (eventId) => {
    return db.collection('events').doc(eventId)
}

export const addEventToFirestore = (event) => {
    const user = firebase.auth().currentUser

    return db.collection('events').add({
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: user.photoURL || null,
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
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
        if (user.displayName !== profile.displayName) {
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

export const addUserAttendance = (event) => {
    const user = firebase.auth().currentUser

    return db.collection('events').doc(event.id).update({
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
}

export const cancelUserAttendance = async (event) => {
    const user = firebase.auth().currentUser
    try {
        const eventDoc = await db.collection('events').doc(event.id).get()

        return await db.collection('events').doc(event.id).update({
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid),
        })
    } catch (error) {
        throw error
    }
}

export const getUserEventsQuery = (activeTab, userUid) => {
    const today = new Date()
    let eventsRef = db.collection('events')

    switch (activeTab) {
        case 1: // past events
            return eventsRef
                .where('attendeeIds', 'array-contains', userUid)
                .where('date', '<=', today)
                .orderBy('date', 'desc')
        case 2: // hosting
            return eventsRef
                .where('hostUid', '==', userUid)
                .orderBy('date')
        default: // future events
            return eventsRef
                .where('attendeeIds', 'array-contains', userUid)
                .where('date', '>=', today)
                .orderBy('date')
    }
}