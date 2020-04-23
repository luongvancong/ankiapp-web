import React from 'react';
import {isLogged} from "../Services/AuthService";
import {Redirect, Route} from "react-router-dom";

class RequireAuthRoute extends React.Component {


    render() {
        const RouterComponent = this.props.component;
        return <Route
            path={this.props.path}
            exact={this.props.exact}
            render={props => {
                if (!isLogged) {
                    return <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                }
                return <RouterComponent {...props} />
            }}
        />
    }
}

RequireAuthRoute.defaultProps = {
    exact: false
};

export default RequireAuthRoute;