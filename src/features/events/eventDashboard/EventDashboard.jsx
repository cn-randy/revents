import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid } from "semantic-ui-react";
import {useFirestoreCollection} from "../../../app/hooks/useFirestoreCollection";
import {listenToEventsFromFirestore} from "../../../app/firestore/firestoreService";
import {listenToEvents} from "../eventActions";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemDashboard";
import EventFilters from "./EventFilters";
import EventsFeed from "./EventsFeed";

export default function EventDashboard() {
    const dispatch = useDispatch()
    const { events } = useSelector(state => state.event)
    const {loading} = useSelector(state => state.async)
    const {authenticated} = useSelector(state => state.auth)
    const [predicate, setPredicate] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]))

    const handleSetPredicate = (key, value) => {
        setPredicate(new Map(predicate.set(key, value)))
    }

    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(predicate),
        data: events => dispatch(listenToEvents(events)),
        dependencies: [dispatch, predicate]
    })

  return (
    <Grid>
      <Grid.Column width={10}>
          {loading &&
              <React.Fragment>
                  <EventListItemPlaceholder />
                  <EventListItemPlaceholder />
              </React.Fragment>
          }
        <EventList
          events={events}
        />
      </Grid.Column>

      <Grid.Column width={6}>
          {authenticated && <EventsFeed />}
        <EventFilters loading={loading} predicate={predicate} setPredicate={handleSetPredicate} />
      </Grid.Column>
    </Grid>
  );
}
