import api from './axios';

const authApi = {
    async loginUser(data){
        const response = await api.post('/auth/login', data);
        return response.data;
    },
    async registerUser(data){
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    async logoutUser(){
        const response = await api.post('/auth/logout');
        return response.data;
    },
    async refreshSession(){
        const response = await api.post('/auth/refresh');
        return response.data;
    },
}

export default authApi;