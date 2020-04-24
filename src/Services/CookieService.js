import Cookies from 'js-cookie';

class CookieService {

    setCookie = (cname, cvalue, exdays, path = '/') => {
        Cookies.set(cname, cvalue, { expires: exdays, path: path });
    };

    getCookie = (cname) => {
        return Cookies.get(cname);
    };

    remove = (name, options) => {
        Cookies.remove(name, options);
    }
}

const cookieService = new CookieService();

export {cookieService};