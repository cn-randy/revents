// node modules
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'

// assets
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css"
import "react-calendar/dist/Calendar.css"
import "./app/layout/styles.css";

// configuration
import {configureStore} from './app/store/configureStore'
import * as serviceWorker from "./serviceWorker";

// React components
import App from "./app/layout/App";
import ScrollToTop from './app/layout/scrollToTop'

const store = configureStore()

const rootEl = document.getElementById("root");

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop />
                <App/>
            </BrowserRouter>
        </Provider>,
        rootEl
    )
}

if (module.hot) {
    module.hot.accept("./app/layout/App", function () {
        setTimeout(render);
    });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
