import React from 'react';
import {Route} from "react-router-dom";
import AccountPage from "../features/auth/AccountPage";
import ProfilePage from "../features/profiles/profilePage/ProfilePage";

const authRoutes = (
    <React.Fragment>
        <Route path='/auth/account' component={AccountPage}/>
        <Route path='/profile/:id' component={ProfilePage}/>
    </React.Fragment>

)

export default authRoutes;