import React from "react";
import EventListItem from "./EventListItem";

export default function EventList(props) {
  return (
    <div className='event-list-item'>
      {props.events.map((event) => {
        return <EventListItem key={event.id} event={event} />;
      })}
    </div>
  );
}
