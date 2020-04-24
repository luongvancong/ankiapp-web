import axios from 'axios';
import _ from 'lodash';
import * as env from '../env';
import {cookieService} from "./CookieService";
import {notification, Modal} from "antd";

const http = axios.create({
    baseURL: env.API_URL,
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${cookieService.getCookie('auth_token')}`
    }
});

http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode = _.get(error, 'response.status');

    if (statusCode === 401) {
        notification.error({
            message: "Unauthorized"
        });

        window.location.href = '/login';
    } else {
        return Promise.reject(error);
    }
});

export {http};