import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {http} from "../../Services/ApiService";

class DashBoard extends Component {

    componentDidMount() {
        http.get('/api/v1/me')
            .then(response => {
                console.log(response.data);
            })
    }

    render() {
        return (
            <div>Dashboard</div>
        )
    }
}

export default DashBoard;