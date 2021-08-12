import './App.css';
import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import User from "./components/users/user";

import GitHubState from "./context/GitHubState";
import AlertState from "./context/alert/AlertState";

const App = () => {


    return (
        <GitHubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <div className="container">
                            <Alert/>
                            <Switch>
                                {/*switch used for navigation to move from page to page*/}
                                <Route
                                    exact // this means exact page has to be the same with a slash.
                                    path='/' // this is the homepage
                                    render={props => ( // render means this fragment will be rendered.
                                        <Fragment>
                                            <Search/>
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
            </AlertState>
        </GitHubState>
    );

};
export default App;
