import axios from 'axios';

import {
    LOGIN_USER, REGISTER_USER
} from './types';

export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)
    //리덕스를 사용해야함.
    return {
        //여기서 reducer로 보내야함.
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)
    //리덕스를 사용해야함.
    return {
        //여기서 reducer로 보내야함.
        type: REGISTER_USER,
        payload: request
    }
}