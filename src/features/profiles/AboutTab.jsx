import React, {useState} from 'react';
import {Button, Grid, Header, Tab} from "semantic-ui-react";
import {format} from 'date-fns'
import ProfileForm from "./ProfileForm";

const AboutTab = ({profile, isCurrentUser}) => {
    const [editMode, setEditMode] = useState(false)

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={`About ${profile.displayName}`}/>
                    {isCurrentUser &&
                    <Button
                        floated="right"
                        basic
                        content={editMode ? 'Cancel' : 'Edit'}
                        onClick={() => setEditMode(!editMode)}
                    />}

                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode
                        ? (<ProfileForm profile={profile} />)
                        : (
                        <React.Fragment>
                            <div style={{marginBottom: 10}}>
                                <strong>Member since {format(profile.createdAt, 'dd MMM yyyy')} </strong>
                                <div>{profile.description || null}</div>
                            </div>
                        </React.Fragment>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default AboutTab;