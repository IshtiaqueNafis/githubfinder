import React from 'react';
import UsersItem from "./usersItem";
import Spinner from '../spinner'
import PropTypes from 'prop-types'
const Users = ({users,loading}) => {
  if(loading){
      return <Spinner/>
  }
    return (
        <div style={userStyle}>
            {users.map(user => {

                return (
                    <div>
                        <UsersItem key={user.id} user={user}/>
                    </div>
                );
            })}
        </div>
    );
};

Users.propTypes={
    users:PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: "grid",
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users;