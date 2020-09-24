import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "../../features/nav/Navbar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetails/EventDetailedPage";

function App() {
  // Render Navbar on all routes except the home page
  return (
    <>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          path={"/(.*)"}
          render={() => (
            <>
              <Navbar />
              <Container className='main'>
                <Route exact path='/events' component={EventDashboard} />
                <Route exact path={['/events/create', '/events/manage/:id']} component={EventForm} />
                <Route exact path='/events/:id' component={EventDetailedPage} />
              </Container>
            </>
          )}
        />
      </Switch>
    </>
  );
}

export default App;
