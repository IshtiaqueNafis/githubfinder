import React, {useContext} from 'react';
import AlertContext from "../../context/alert/AlertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alert} = alertContext; // object descturing
    return (
        alert != null && (
            <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
        )
    );
};

export default Alert;