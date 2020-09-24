import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import { sampleData } from "../../../api/sampleData";

import EventList from "./EventList";

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  /**
   * Perist new event
   *
   * @param {*} event   new Event to be added
   */
  // const createEventHandler = (event) => {
  //   setEvents([...events, event]);
  // };

  /**
   * Persist uodated record
   *
   * @param {*} updatedEvent
   */
  // const updateEventHandler = (updatedEvent) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  // };

  /**
   * Delete event
   *
   * @param {*} id    Event id of event to be deleted
   */
  const deleteEventHandler = (id) => {
      setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          onDeleteEvent={deleteEventHandler}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
