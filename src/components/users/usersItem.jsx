import React from 'react';
import PropTypes from "prop-types";

const UsersItem = ({user: {login, html_url, avatar_url, id}}) => {

    return (
        <div className='card text-center'>
            <img className='round-img'

                 src={avatar_url}
                 style={{width: '60px'}}
                 alt=""/>
            <h3 key={id}>{login}</h3>
            <div>
                <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
            </div>

        </div>
    );
};

UsersItem.propTypes = {
    user: PropTypes.object.isRequired, // shotcut isptor.
}

export default UsersItem;