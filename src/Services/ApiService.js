import axios from 'axios';
import _ from 'lodash';
import {cookieService} from "./CookieService";
import {Modal} from "antd";

const http = axios.create({
    baseURL: process.env.API_URL,
    timeout: 60000
});

http.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${cookieService.getCookie('auth_token')}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode = _.get(error, 'response.status');

    if (statusCode === 401) {
        Modal.error({
            content: "Unauthorized. Please login",
            onOk: () => {
                window.location.href = '/login';
            }
        })
    } else {
        return Promise.reject(error);
    }
});

export {http};
