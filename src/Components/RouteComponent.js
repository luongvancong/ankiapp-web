import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "../Screens/Login";
import RequireAuthRoute from "./RequireAuthRoute";
import DashBoard from "../Screens/DashBoard";

class RouteComponent extends React.Component {

    render() {
        return (
            <Switch>
                <Route
                    path={"/login"}
                    exact={true}
                    render={props => <Login {...props}/>}
                />
                <RequireAuthRoute
                    path={"/"}
                    exact={true}
                    component={DashBoard}
                />
            </Switch>
        )
    }
}


export default RouteComponent;