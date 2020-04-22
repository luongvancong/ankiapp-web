import React, {Component} from 'react';
import {Link} from "react-router-dom";

class DeskList extends Component {

    render() {
        return (
            <div>
                <Link to={'/desks/1'}>detail</Link>
                <Link to={'/desks/1/cards'}>cards</Link>
            </div>
        )
    }
}

export default DeskList;