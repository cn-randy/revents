import React from 'react';
import {Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic} from "semantic-ui-react";

const ProfileHeader = ({profile, isCurrentUser}) => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile.photoURL || "/assets/user.png"} />
                            <Item.Content verticalAlign="middle">
                                <Header
                                    as="h1"
                                    style={{display: 'block', marginBottom: 10}}
                                    content={profile.displayName}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label="followers" value={10} />
                        <Statistic label="following" value={5} />
                    </Statistic.Group>
                    {!isCurrentUser &&
                    <React.Fragment>
                        <Divider/>
                        <Reveal animated="move">
                            <Reveal.Content visible style={{width: '100%'}}>
                                <Button fluid color="teal" content="Following"/>
                            </Reveal.Content>
                            <Reveal.Content hidden style={{width: '100%'}}>
                                <Button basic fluid color="red" content="Unfollow"/>
                            </Reveal.Content>
                        </Reveal>
                    </React.Fragment>
                    }
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default ProfileHeader;