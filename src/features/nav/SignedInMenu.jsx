import React from "react";
import {Link, useHistory} from 'react-router-dom'
import { Menu, Image, Dropdown } from "semantic-ui-react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {signOutFirebase} from "../../app/firestore/firebaseService";

const SignedIn = () => {
    const {currentUser} = useSelector(state => state.auth)
    const history = useHistory()

    const handleSignOut = async () => {
        try {
            history.push('/')
            await signOutFirebase()
        } catch (error) {
            toast().error(error.message)
        }
    }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUser.photoURL || '/assets/user.png'} />
      <Dropdown pointing='top left' text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={'/events/create'} text='Create Event' icon='plus' />

          <Dropdown.Item text='My Profile' icon='user' />

          <Dropdown.Item as={Link} to="/auth/account" text='My Account' icon='settings' />

          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedIn;
