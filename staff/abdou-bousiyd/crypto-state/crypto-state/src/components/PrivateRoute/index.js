import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import context from '../../logic/context'


function PrivateRoute(props) {
    const {component: Component, ...rest} = props;
    return (
        <Route {...rest} render={(componentProps) => {
            if (this.token) {
                return <Component {...componentProps}/>
            }
            return <Redirect to='/login' />
        }} />
    )
}

export default PrivateRoute.bind(context)