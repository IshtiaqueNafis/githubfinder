import './App.css';
import React, {Fragment, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import User from "./components/users/user";

import GitHubState from "./context/GitHubState";

const App = () => {
    //region state users,repos,user,loading,alert

    const [alert, setAlert] = useState(null); // alert? show error message : no error messae.
//endregion

    //region  methods  searchUsers (), clearUsers,setAlert,componentDidMount() ,getUserRepos();


    //region   setAlert() --> setalert state if a useres typed an error message.
    const showAlert = (msg, type) => {
        setAlert({msg, type});
        setTimeout(() => setAlert(null), 5000)
    };

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

                                        <Users/>
                                    </Fragment>
                                )}

                            />
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/users/:login' component={User}/>
                        </Switch>

                    </div>
                </div>
            </Router>
        </GitHubState>
    );

};
export default App;
