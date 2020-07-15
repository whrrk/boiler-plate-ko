import React, { useEffect } from 'react';
import axios from 'axios';
const LandingPage = (props) => {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => {

            })
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login");
                } else {
                    alert('Failed Logout');
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>Logout</button>
        </div >
    )
}

export default LandingPage;
