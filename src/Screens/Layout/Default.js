import React from 'react';
import {Button, Layout} from "antd";
import _ from 'lodash';
import {http} from "../../Services/ApiService";
import {notification} from "antd/es";
import {Link} from "react-router-dom";

const {Header, Content} = Layout;

class Default extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {}
        }
    }

    componentDidMount() {
        this.fetchMe();
        this.apiCall();
    }

    fetchMe = () => {
        http.get('/api/v1/me')
            .then(response => {
                this.setState({
                    me: _.get(response, 'data')
                })
            })
    };

    apiCall = () => {
        // @TODO replace me
    };

    content = () => {
        return (
            <div>Content</div>
        )
    };

    render() {
        const {me} = this.state;
        return (
            <Layout className={'layout--default'}>
                <Header className="header">
                    <div className="float-right username">{me.name}</div>
                </Header>
                <Content>
                    <div className="container">
                        <div className={'mg-t-20'}>
                            <Link className={'link-to-dashboard'} to={'/'}>
                                <Button>Dashboard</Button>
                            </Link>
                        </div>
                        {this.content()}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Default;