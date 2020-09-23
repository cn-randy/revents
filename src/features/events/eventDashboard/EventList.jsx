import React from "react";
import EventListItem from "./EventListItem";

export default function EventList({ events, onSelectEvent, onDeleteEvent }) {
  return (
    <div className='event-list-item'>
      {events.map((event) => {
        return (
          <EventListItem
            key={event.id}
            event={event}
            onSelectEvent={onSelectEvent}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
}
