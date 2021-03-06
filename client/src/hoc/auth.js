import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


export default function (SpecificComponent, option, adminRoute = null) {
    // option-> null: 아무나 ,true: 로그인한 유저만, false: 로그인유저는 출입불가
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {

                //분기처리 로그인여부, 권한마다
                if (!response.payload.isAuth) { //로그인하지 않은 상태
                    if (option) {
                        props.history.push('/login')
                    }
                } else { //로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')

                    } else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }

                }
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}