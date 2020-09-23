import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import { sampleData } from "../../../api/sampleData";

import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";

export default function EventDashboard({
  formOpen,
  setFormOpen,
  onSelectEvent,
  selectedEvent,
}) {
  const [events, setEvents] = useState(sampleData);

  const createEventHandler = (event) => {
    setEvents([...events, event]);
  };

  const updateEventHandler = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );

    onSelectEvent(null);
  };

  const deleteEventHandler = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          onSelectEvent={onSelectEvent}
          onDeleteEvent={deleteEventHandler}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            onCreateEvent={createEventHandler}
            selectedEvent={selectedEvent}
            onUpdateEvent={updateEventHandler}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
