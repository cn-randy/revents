import React, { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link, NavLink, useHistory } from "react-router-dom";

import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

export default function Navbar({ setFormOpen }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  const signOutHandler = () => {
    setAuthenticated(false);
    history.push("/events");
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <img src='/assets/logo.png' alt='Logo' style={{ marginRight: 15 }} />
          Revents
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/events' name='Events' />
        <Menu.Item as={NavLink} exact to='/events/sandbox' name='Sandbox' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/events/create'>
            <Button positive inverted content='Create event' />
          </Menu.Item>
        )}

        {authenticated ? (
          <SignedInMenu signout={signOutHandler} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}
