import React, {useContext} from 'react';
import UsersItem from "./usersItem";
import Spinner from '../spinner'
import GithubContext from "../../context/githubContext";
const Users = () => {
    const githubContext = useContext(GithubContext)

    const {users,loading} = githubContext;
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

}

const userStyle = {
    display: "grid",
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users;