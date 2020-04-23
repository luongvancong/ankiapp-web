import React from 'react';
import _ from 'lodash';
import {Button, Form, Input, notification} from "antd";
import loginApiService from '../../Services/LoginApiService';
import * as env from '../../env';
import {cookieService} from "../../Services/CookieService";


class Login extends React.Component {

    handleSubmit = (values) => {
        loginApiService.login({
            grant_type : "password",
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            username: values.username,
            password: values.password
        }).then(response => {
            const data = _.get(response, 'data');
            cookieService.setCookie('auth_token', data.access_token, 15);
            this.props.history.replace('/');
        }).catch(err => {
            notification.error({
                message: _.get(err, 'response.data.message')
            });
        })
    };

    render() {
        return (
            <div className="login-form">
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
                        <Button htmlType="submit" type={'primary'}>Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;