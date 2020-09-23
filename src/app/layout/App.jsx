import React, { useState } from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import Navbar from "../../features/nav/Navbar";
import { Container } from "semantic-ui-react";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectEventHandler = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const createFormOpenHandler = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  return (
    <>
      <Navbar setFormOpen={createFormOpenHandler} />
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          onSelectEvent={selectEventHandler}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
