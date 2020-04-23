import React from 'react';
import {Switch} from "react-router-dom";
import Login from "../Screens/Login";
import RequireAuthRoute from "./RequireAuthRoute";
import DashBoard from "../Screens/DashBoard";
import RedirectIfLoggedRoute from "./RedirectIfLoggedRoute";
import DeskDetail from "../Screens/Desk/Detail";
import DeskStudy from "../Screens/Desk/Study";

class RouteComponent extends React.Component {

    render() {
        return (
            <Switch>
                <RedirectIfLoggedRoute
                    path={"/login"}
                    exact={true}
                    component={Login}
                />
                <RequireAuthRoute
                    path={"/desks/:id"}
                    exact={true}
                    component={DeskDetail}
                />
                <RequireAuthRoute
                    path={"/desks/:id/study"}
                    exact={true}
                    component={DeskStudy}
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