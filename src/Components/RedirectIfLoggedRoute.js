import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {http} from "../Services/ApiService";

class RedirectIfLoggedRoute extends React.Component {

    render() {
        const RouterComponent = this.props.component;
        return <Route
            path={this.props.path}
            exact={this.props.exact}
            render={props => {
                return <RouterComponent {...props} />
            }}
        />
    }
}

RedirectIfLoggedRoute.defaultProps = {
    exact: false
};

export default RedirectIfLoggedRoute;