import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import Spinner from "../spinner";
import {Link} from "react-router-dom"
import Repos from "../repos/repos";

class User extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        loading: PropTypes.bool,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired


    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
        //login is the parameters being passed.

    }

    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            company,
            hireable,
        } = this.props.user;

        const {loading} = this.props;
        if (loading) {
            return <Spinner/>
        }

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Home</Link>
                <span>Hireable:{' '}</span>
                {hireable ? <span className='text-success'>Yes</span> : <span className='text-danger'>NO</span>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="" className='round-img' style={{width: '150px'}}/>
                        <h1>{name}</h1>
                        <p>location:{location}</p>
                    </div>
                    <div>
                        {bio &&
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                        }
                        <a href={html_url} className="btn btn-dark my-1">GitHub Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>UserName:</strong>{login}
                                </Fragment>}
                            </li>
                            <li>{company && <Fragment>
                                <strong>Company:</strong>{login}
                            </Fragment>}</li>
                            <li>
                                <li>{blog && <Fragment>
                                    <strong>Website:</strong> {blog}
                                </Fragment>}</li>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>Followers:{followers}</div>
                    <div className='badge badge-success'>Following:{following}</div>
                    <div className='badge badge-light'>Public Repos:{public_repos}</div>
                    <div className='badge badge-dark'>Public Gists:{public_gists}</div>


                </div>
                <Repos repos={this.props.repos} // based on user this will be fetched.
                />
            </Fragment>


        );
    }
}

export default User;