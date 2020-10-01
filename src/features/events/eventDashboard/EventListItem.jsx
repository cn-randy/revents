import React from "react";
import {Segment, Item, Icon, List, Button, Label} from "semantic-ui-react";
import EventLisAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import {format} from 'date-fns'
import {deleteEvenetInFirestore} from "../../../app/firestore/firestoreStervice";

export default function EventListItem({ event }) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src="https://randomuser.me/api/portraits/men/20.jpg" />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>
                Hosted By {event.hostedBy} {event.hostPhotoURL}
              </Item.Description>
                {event.isCancelled && (
                    <Label
                        style={{top: '-40px'}}
                        ribbon="right"
                        color="red"
                        content="This event has been cancelled."
                    />
                )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventLisAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color='red'
          floated='right'
          content='Delete'
          onClick={() => deleteEvenetInFirestore(event.id)}
        />

        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}
