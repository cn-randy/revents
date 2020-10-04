import React from 'react';
import {Route, useLocation} from 'react-router-dom'
import Sandbox from "../features/sandbox/Sandbox";
import EventDetailedPage from "../features/events/eventDetails/EventDetailedPage";
import EventDashboard from "../features/events/eventDashboard/EventDashboard";
import EventForm from "../features/events/eventForm/EventForm";

const EventRoutes = () => {
    const {key} = useLocation()
}

const eventRoutes = (
        <React.Fragment>
            <Route path={['/events/create', '/events/manage/:id']} component={EventForm} key={EventRoutes.key}/>
            <Route path="/events/sandbox" component={Sandbox}/>
            <Route path='/events/:id' component={EventDetailedPage}/>
            <Route path='/events' component={EventDashboard}/>
        </React.Fragment>
    )

export default eventRoutes;