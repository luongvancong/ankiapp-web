import {http} from "./ApiService";

const DeskApiService = {
    getById: (id) => http.get(`/api/v1/desks/${id}`),
    list: (params = {}) => http.get('/api/v1/me/desks', {...params}),
    create: (data) => http.post('/api/v1/desks', {...data}),
    update: (id, data) => http.patch(`/api/v1/desks/${id}`, data),
    delete: (id) => http.delete(`/api/v1/desks/${id}`),
    getCards: (deskId, params = {}) => http.get('/api/v1/cards', {
        params: {
            desk_id: deskId,
            ...params
        }
    }),
    getStudy: (deskId) => http.get(`/api/v1/desks/${deskId}/study`)
};

export default DeskApiService;