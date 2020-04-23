import {http} from "./ApiService";

const CardApiService = {
    create: (data) => http.post('/api/v1/cards', data)
};

export default CardApiService;