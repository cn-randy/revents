import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import {useSelector} from "react-redux";

export default function Navbar({ setFormOpen }) {
  const {authenticated} = useSelector(state => state.auth)

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
          <SignedInMenu />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
}
