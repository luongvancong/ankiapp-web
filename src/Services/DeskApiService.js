import {http} from "./ApiService";

const DeskApiService = {
    getById: (id) => http.get(`/api/v1/desks/${id}`),
    list: (params = {}) => http.get('/api/v1/me/desks', {...params}),
    create: (data) => http.post('/api/v1/desks', {...data}),
    getCards: (deskId, params = {}) => http.get('/api/v1/cards', {
        desk_id: deskId,
        ...params
    }),
    getStudy: (deskId) => http.get(`/api/v1/desks/${deskId}/study`)
};

export default DeskApiService;