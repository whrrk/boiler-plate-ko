import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux'; //dispatch를 이용해서 action , action 다음에 reducer
import { loginUser } from '../../../_actions/user_action';
function LoginPage(props) {
    const dispatch = useDispatch();

    //서버에 보내고자하는 값들을 여기 state에서 가지고 있는것임.
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();//refresh를 막아주는것.

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert('error');
                }
            })


    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>

            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
