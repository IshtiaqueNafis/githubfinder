import React from 'react';
import spinner from './spinner.gif'
const Spinner = () => {
    return (
        <React.Fragment>
            <img src={spinner} alt="loading..." style={{width:'200px',margin:'auto'}}/>
        </React.Fragment>
    );
};

export default Spinner;