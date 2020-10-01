import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {Container} from "semantic-ui-react";

import './styles.css'

import Navbar from "../../features/nav/Navbar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetails/EventDetailedPage";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import {ToastContainer} from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";

/**
 * This is the entry component
 * Note: An unique key should always be passed to evey form
 *
 * @property $Key string    - unique key for each page
 * @property pahname string - pathname
 *
 * @returns {JSX.Element}
 */
function App() {
    const {key, pathname} = useLocation()

    // Render Navbar on all routes except the home page
    return (
        <>
            <ModalManager />
            <ToastContainer position="bottom-right" hideProgressBar />
            {pathname !== '/' ? <Navbar/> : null}
            <Container className='main'>
                <Switch>
                    <Route path={['/events/create', '/events/manage/:id']} component={EventForm} key={key}/>
                    <Route path="/events/sandbox" component={Sandbox}/>
                    <Route path='/events/:id' component={EventDetailedPage}/>
                    <Route path='/events' component={EventDashboard}/>
                    <Route path="/error" component={ErrorComponent} />
                    <Route path="/" component={HomePage}/>
                </Switch>
            </Container>
        </>
    )
}

export default App;
