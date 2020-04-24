import {http} from "./ApiService";

const CardApiService = {
    create: (data) => http.post('/api/v1/cards', data),
    getById: (id) => http.get(`/api/v1/cards/${id}`),
    update: (id, data) => http.patch(`/api/v1/cards/${id}`, data),
    delete: (id) => http.delete(`/api/v1/cards/${id}`)
};

export default CardApiService;