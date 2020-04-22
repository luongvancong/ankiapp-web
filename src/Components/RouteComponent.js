import React from 'react';
import {Route, Switch} from "react-router-dom";
import _ from 'lodash';
import routes from "../routes";


class RouteComponent extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        const _routes = _.reverse(this.routes);
        return (
            <Switch>
                {_routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            <route.component {...props} />
                        )}
                    />
                ))}
            </Switch>
        )
    }
}


export default RouteComponent;