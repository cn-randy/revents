import React, { useState } from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import cuid from "cuid";

export default function EventForm({
  setFormOpen,
  setEvents,
  onCreateEvent,
  onUpdateEvent,
  selectedEvent,
}) {
  const initialEvent = selectedEvent || {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [event, setEvent] = useState(initialEvent);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!!selectedEvent.id) {
      onUpdateEvent({ ...selectedEvent, ...event });
    } else {
      onCreateEvent({
        ...event,
        id: cuid,
        hostedBy: "Fred",
        attendees: [],
        hostPhotoURL: "/assets/user.png",
      });
    }

    setFormOpen(false);
  };

  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    setEvent({ ...event, [id]: value });
  };

  return (
    <Segment clearing>
      <Header
        content={
          !!selectedEvent.id ? "Editing the event" : "Create a new event"
        }
      />
      <Form onSubmit={submitFormHandler}>
        <Form.Field>
          <input
            type='text'
            id='title'
            placeholder='Event title'
            value={event.title}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <input
            type='text'
            id='category'
            placeholder='Category'
            value={event.category}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <input
            type='text'
            id='description'
            placeholder='Description'
            value={event.description}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <input
            type='text'
            id='city'
            placeholder='City'
            value={event.city}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <input
            type='text'
            id='venue'
            placeholder='Venue'
            value={event.venue}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Form.Field>
          <input
            type='date'
            id='date'
            placeholder='Date'
            value={event.date}
            onChange={inputChangeHandler}
          />
        </Form.Field>

        <Button type='Submit' floated='right' positive content='Submit' />
        <Button
          type='Submit'
          floated='right'
          content='Cancel'
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}
