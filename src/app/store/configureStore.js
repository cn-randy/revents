import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk'

/**
 * Creates a redux store and passes the root reducer and any store
 * enhancers required by the app. Multiple enhancers can by combined
 * by passing them yp the compose method
 *
 * @returns {Store<unknown, Action>}
 */
export const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}
