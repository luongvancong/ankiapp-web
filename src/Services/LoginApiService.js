import {http} from "./ApiService";

export default {
    login: (credentials) => http.post('/oauth/token', {...credentials})
}