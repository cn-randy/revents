import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT, LISTEN_TO_EVENT_CHAT} from "./eventConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../app/async/asyncReducer";
import {fetchSampleData} from "../../app/api/mockApi";

export const loadEvents = () => {
    return async function (dispatch) {
        dispatch(asyncActionStart())
        try {
            const events = await fetchSampleData()
            dispatch({
                type: FETCH_EVENT,
                payload: events
            })
            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}

export const listenToEvents = (events) => {
    return {
        type: FETCH_EVENT,
        payload: events,
    }
}

export const createEvent = event => {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

export const updateEvent = event => {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export const deleteEvent = eventId => {
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
}

export const listenToEventChat = (comments) => {
    return {type: LISTEN_TO_EVENT_CHAT, payload: comments}
}
