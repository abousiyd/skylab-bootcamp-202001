import React from 'react';
import { Route, Redirect } from 'react-router-dom'


function isAuthenticated() {
    const token = localStorage.getItem('token')
    if (token) {
        return true;
    }
    return false
}

function PrivateRoute(props) {
    const {component: Component, ...rest} = props;
    return (
        <Route {...rest} render={(componentProps) => {
            if (isAuthenticated()) {
                return <Component {...componentProps}/>
            }
            return <Redirect to='/login' />
        }} />
    )
}

export default PrivateRoute