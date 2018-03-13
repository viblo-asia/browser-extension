import { apiUrl } from '~/config';
import * as auth from 'viblo-sdk/auth';
import axios from 'viblo-sdk/libs/axios';

export function setUpApi() {
    axios.defaults.baseURL = apiUrl;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

export function setAuthToken(token) {
    if (token) {
        auth.setAccessToken({
            token_type: 'Bearer',
            access_token: token
        });
    }
}

export function validateToken(token) {
    return axios.get('/me', {
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(() => true)
        .catch(() => false);
}

export function sendVisit(type) {
    return axios.put(`/me/activity/visit/${type}`);
}
