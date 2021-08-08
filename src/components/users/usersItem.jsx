import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const UsersItem = ({user: {login, html_url, avatar_url, id}}) => {

    return (
        <div className='card text-center'>
            <img className='round-img'

                 src={avatar_url}
                 style={{width: '60px'}}
                 alt=""/>
            <h3 key={id}>{login}</h3>
            <div>
                <Link to={`/users/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>

        </div>
    );
};

UsersItem.propTypes = {
    user: PropTypes.object.isRequired, // shotcut isptor.
}

export default UsersItem;