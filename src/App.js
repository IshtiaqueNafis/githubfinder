import './App.css';
import React, {Fragment, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import User from "./components/users/user";

import GitHubState from "./context/GitHubState";

const App = () => {
    //region state users,repos,user,loading,alert

    const [repos, setRepos] = useState([]); // grab repo for the single selected user.
    const [loading, setLoading] = useState(false); // loading cursor ? loading scroll:loading scroll loading
    const [alert, setAlert] = useState(null); // alert? show error message : no error messae.
//endregion

    //region  methods  searchUsers (), clearUsers,setAlert,componentDidMount() ,getUserRepos();





    //region   setAlert() --> setalert state if a useres typed an error message.
    const showAlert = (msg, type) => {
        setAlert({msg, type});
        setTimeout(() => setAlert(null), 5000)
    };

    //endregion




    //region getUsersRepos() --> get repo of the users
    const getUserRepos = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //region await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //{username}/repos?per_page=5&sort=created:as -->repos this gets the repo item.
        //per_page=5 --> get 5 pages from the item
        // sort=created:as sort is created based om ascedinmg order.
        //endregion
        setRepos(res.data);
        setLoading(false);
    }

    //endregion


//endregion


    return (
        <GitHubState>


            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            {/*switch used for navigation to move from page to page*/}
                            <Route
                                exact // this means exact page has to be the same with a slash.
                                path='/' // this is the homepage
                                render={props => ( // render means this fragment will be rendered.
                                    <Fragment>
                                        <Search

                                            setAlert={showAlert}/>

                                        <Users />
                                    </Fragment>
                                )}

                            />
                            <Route exact path='/about' component={About}/>
                            <Route
                                exact path='/users/:login' // wo;; require user/:login
                                render={props => {
                                    //render used for rendering items.
                                    return ( //
                                        <User {...props}

                                              getUserRepos={getUserRepos} // this repos from the users.

                                              repos={repos} // pass the repos
                                              /> // object destrucring is being done here to pass extra props
                                    );
                                }}/>
                        </Switch>

                    </div>
                </div>
            </Router>
        </GitHubState>
    );

};
export default App;
