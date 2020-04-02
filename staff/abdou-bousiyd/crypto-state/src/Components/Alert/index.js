import React from 'react';
import './Alert.sass'

function Alert(props) {
    const {message} = props;
    return <div className="alert">
        <span className="material-icons">warning</span>
        <span className="alert-text">{message}</span>
    </div>
}

export default Alert;
