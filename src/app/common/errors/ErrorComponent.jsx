import React from 'react';
import {useSelector} from "react-redux";
import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const ErrorComponent = () => {
    const {error} = useSelector(state =>state.async)
    console.log(error)
    return (
        <Segment placeholder>
            <Header textAlign="center" content={error?.message || 'Oops - we have an error'} />
            <Button as={Link} to="/events" primary style={{marginTop: 20 }} content="Return to events page" />
        </Segment>
    );
};

export default ErrorComponent;