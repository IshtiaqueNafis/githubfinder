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


const App = () => {
    //region state users,repos,user,loading,alert
    const [users, setUsers] = useState([]); // grab the users from api
    const [repos, setRepos] = useState([]); // grab repo for the single selected user.
    const [user, setUser] = useState({}); // show details about a single user
    const [loading, setLoading] = useState(false); // loading cursor ? loading scroll:loading scroll loading
    const [alert, setAlert] = useState(null); // alert? show error message : no error messae.
//endregion

    //region  methods  searchUsers (), clearUsers,setAlert,componentDidMount() ,getUserRepos();

    //region     searchUsers = async (text) --> finds users based text and set the state for the users object.
    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //region code explanation
        // await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        /*
           https://api.github.com/search/users --> this is the api for getting the users from the servers.
           {text}&client_id=$ --> test is the search button which will be provided by the users.
           {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
         */

        //endregion
        setUsers(res.data.items); // setting the users.
        setLoading(false); // setting the loading


    }
//endregion

    //region  clearUsers() --> clear searches resets state to 0
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }
    //endregion

    //region   setAlert() --> setalert state if a useres typed an error message.
    const showAlert = (msg, type) => {
        setAlert({msg, type});
        setTimeout(() => setAlert(null), 5000)
    };

    //endregion

    //region    getUser = async (username)  -->get a single github user
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        setUser(res.data); // setting the users.
        setLoading(false); // setting the loading
    }
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
                                        searchUsers={searchUsers}  // the function that returns an array of users based on search
                                        clearUsers={clearUsers} //function resets everything thing
                                        showClear={users.length > 0}
                                        setAlert={showAlert}/>

                                    <Users loading={loading} users={users}/>
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
                                          getUser={getUser} // this gets the user
                                          getUserRepos={getUserRepos} // this repos from the users.
                                          user={user} // pass the user object.
                                          repos={repos} // pass the repos
                                          loading={loading}/> // object destrucring is being done here to pass extra props
                                );
                            }}/>
                    </Switch>

                </div>
            </div>
        </Router>
    );

};
export default App;
