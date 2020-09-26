import React from "react";
import EventListItem from "./EventListItem";

export default function EventList({ events }) {
  return (
    <div className='event-list-item'>
      {events.map((event) => {
        return (
          <EventListItem key={event.id} event={event} />
        );
      })}
    </div>
  );
}
