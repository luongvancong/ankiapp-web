import React from 'react';
import {Dropdown, Layout, Menu} from "antd";
import _ from 'lodash';
import {http} from "../../Services/ApiService";
import {Link} from "react-router-dom";
import {cookieService} from "../../Services/CookieService";

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

    handleLogout = () => {
        cookieService.remove('auth_token');
        this.props.history.replace('/login');
    };

    renderDropdownMenu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <span
                        className={'pointer'}
                        onClick={this.handleLogout}
                    >Logout</span>
                </Menu.Item>
            </Menu>
        )
    };

    render() {
        const {me} = this.state;
        return (
            <Layout className={'layout layout--default'}>
                <Header className="header">
                    <div className={'float-left'}>
                        <Link className={'link-to-dashboard'} to={'/'}>
                            <span>Dashboard</span>
                        </Link>
                    </div>
                    <Dropdown overlay={this.renderDropdownMenu} trigger={['click']}>
                        <div className="float-right username">{_.get(me, 'name')}</div>
                    </Dropdown>
                </Header>
                <Content>
                    <div className="container">
                        {this.content()}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Default;