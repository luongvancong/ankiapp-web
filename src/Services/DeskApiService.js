import {http} from "./ApiService";

const DeskApiService = {
    list: (params = {}) => http.get('/api/v1/me/desks', {...params}),
    create: (data) => http.post('/api/v1/desks', {...data}),
    getCards: (deskId) => http.get('/api/v1/cards', {desk_id: deskId})
};

export default DeskApiService;