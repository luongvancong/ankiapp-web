import axios from 'axios';
import * as env from '../env';
import {cookieService} from "./CookieService";

const http = axios.create({
    baseURL: env.API_URL,
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${cookieService.getCookie('auth_token')}`
    }
});

export {http};