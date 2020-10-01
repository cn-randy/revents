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