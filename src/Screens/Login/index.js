import React from 'react';
import _ from 'lodash';
import {Button, Form, Input, notification, Spin} from "antd";
import loginApiService from '../../Services/LoginApiService';
import * as env from '../../env';
import {cookieService} from "../../Services/CookieService";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            logged: false
        }
    }


    handleSubmit = (values) => {
        this.setState({
            loading: true
        });
        loginApiService.login({
            grant_type : "password",
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            username: values.username,
            password: values.password
        }).then(response => {
            const data = _.get(response, 'data');
            cookieService.setCookie('auth_token', data.access_token, 15);
            notification.success({
                message: 'Logged'
            });

            this.setState({
                logged: true
            }, () => {
                setTimeout(() => {
                    this.props.history.replace('/');
                }, 2000);
            });

        }).catch(err => {
            notification.error({
                message: _.get(err, 'response.data.message')
            });
        }).finally(() => {
            this.setState({loading: false});
        })
    };

    render() {
        const {loading, logged} = this.state;
        return (
            <div className="login-form">
                <Spin spinning={logged}>
                    <Form layout={'vertical'} onFinish={this.handleSubmit}>
                        <Form.Item
                            label={'Username'}
                            name={'username'}
                            required={true}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={'Password'}
                            name={'password'}
                            required={true}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                htmlType="submit"
                                type={'primary'}
                            >Đăng nhập</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}

export default Login;