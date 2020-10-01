import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemDashboard";
import EventFilters from "./EventFilters";
import {listenTotEventsFromFirestore} from "../../../app/firestore/firestoreStervice";
import {listenToEvents} from "../eventActions";
import {useFirestoreCollection} from "../../../app/hooks/useFirestoreCollection";

export default function EventDashboard() {
    const dispatch = useDispatch()
    const { events } = useSelector(state => state.event)
    const {loading} = useSelector(state => state.async)

    useFirestoreCollection({
        query: () => listenTotEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        dependencies: [dispatch]
    })

  return (
    <Grid>
      <Grid.Column width={10}>
          {loading &&
              <>
                  <EventListItemPlaceholder />
                  <EventListItemPlaceholder />
              </>
          }
        <EventList
          events={events}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
