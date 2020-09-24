import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";

const SignedIn = ({ signout }) => {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown pointing='top left' text='Bob'>
        <Dropdown.Menu>
          <Dropdown.Item text='Create Event' icon='plus' />

          <Dropdown.Item text='My Profile' icon='user' />

          <Dropdown.Item text='Sin out' icon='power' onClick={signout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedIn;
