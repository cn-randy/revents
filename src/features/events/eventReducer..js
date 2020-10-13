import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    FETCH_EVENT,
    LISTEN_TO_EVENT_CHAT,
    CLEAR_COMMENTS
} from "./eventConstants";

const initialState = {
    events: [],
    comments: [],
}

const eventReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case CREATE_EVENT:
            return {...state, events: [...state.events, payload]}
        case UPDATE_EVENT:
            return {
                ...state,
                events: [...state.events.map(evt => evt.id === payload.id ? payload : evt)]
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(event => event.id !== payload)]
            }
        case FETCH_EVENT:
            return {
                ...state,
                events: payload
            }
        case LISTEN_TO_EVENT_CHAT:
            return {
                ...state,
                comments: payload
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: []
            }
        default:
            return state
    }
}

export default eventReducer
