import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT} from "./eventConstants";
import {sampleData} from "../../api/sampleData";

const initialState = {
    events: sampleData
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
        default:
            return state
    }
}

export default eventReducer
