import React from 'react';
import {Header, Menu} from "semantic-ui-react";
import {Calendar} from "react-calendar";

const EventFilters = ({loading, predicate, setPredicate}) => {
    return (
        <>
            <Menu vertical size="large" style={{width: '100%'}}>
                <Header icon="filter" attached color="teal" content="Filters" />
                <Menu.Item
                    content="All Events"
                    active={predicate.get('filter') === 'all'}
                    disabled={loading}
                    onClick={() => setPredicate('filter', 'all')}
                />
                <Menu.Item
                    content="I'm going"
                    active={predicate.get('filter') === 'isGoing'}
                    disabled={loading}
                    onClick={() => setPredicate('filter', 'isGoing')}
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.get('filter') === 'isHost'}
                    disabled={loading}
                    onClick={() => setPredicate('filter', 'isHost')}
                />
            </Menu>
            <Header icon="calendar" attached color="teal" content="Select date" />
            <Calendar
                value={predicate.get('startDate') || new Date()}
                onChange={date => setPredicate('startDate', date)}
                tileDisabled={() => loading}
            />
        </>
    );
};

export default EventFilters;