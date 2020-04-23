import {cookieService} from "./CookieService";

export const isLogged = cookieService.getCookie('auth_token');