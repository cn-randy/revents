import React from 'react';
import {Route, Switch} from "react-router-dom";
import ErrorComponent from "../app/common/errors/ErrorComponent";
import HomePage from "../features/home/HomePage";
import eventRoutes from "./eventRoutes";
import authRoutes from "./authRoutes";

const routes = (
        <Switch>
            {eventRoutes}
            {authRoutes}
            <React.Fragment>
            </React.Fragment>
        </Switch>
    )

export default routes;