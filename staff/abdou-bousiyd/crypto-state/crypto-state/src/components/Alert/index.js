import React from 'react';
import './Alert.sass'

function Alert(props) {


    const {message, error} = props;
    let icon = "check"
    
    if(error){
        icon = "warning"
    }
    return <div className="alert">
        <span className="material-icons">{icon}</span>
        <span className="alert-text">{message}</span>
    </div>
}

export default Alert;
