import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export default function Navbar({ setFormOpen }) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='Logo' style={{ marginRight: 15 }} />
          Revents
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button
            positive
            inverted
            content='Create event'
            onClick={() => setFormOpen(true)}
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Register'
            style={{ marginLeft: "0.5em" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}