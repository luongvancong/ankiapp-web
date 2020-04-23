import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import _ from 'lodash';
import routes from "../routes";
import {cookieService} from "../Services/CookieService";
import Login from "../Screens/Login";
import RequireAuthRoute from "./RequireAuthRoute";
import DashBoard from "../Screens/DashBoard";


class RouteComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false
        };
        this.routes = [];
        this.collectRoute(routes);
    }

    collectRoute(items) {
        for (let item of items) {
            this.routes.push(item);
            if (item.routes) {
                let newRoutes = item.routes.map(it => {
                    return {
                        ...it,
                        path: item.path + it.path
                    }
                });
                this.collectRoute(newRoutes);
            }
        }
    }

    componentDidMount() {
        const authToken = cookieService.getCookie('auth_token');
        if (authToken) {
            this.setState({
                logged: true
            });
        }
    }

    renderRouteComponent = (route, props) => {
        return <route.component {...props} />;
    };

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