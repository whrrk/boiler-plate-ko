import {
    LoginUser, LOGIN_USER
} from '../_actions/types';

export default function (state = {}, action) {

    //타입들이 엄청 많아질거라서
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;

        default:
            return state;
    }
}