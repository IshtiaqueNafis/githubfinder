import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/alert";
import About from "./components/pages/About";
import User from "./components/users/user";
import Home from "./components/pages/home";
import Notfound from "./components/pages/notfound";

import GitHubState from "./context/github/GitHubState";
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
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/users/:login' component={User}/>
                                <Route  component={Notfound}/>
                            </Switch>

                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitHubState>
    );

};
export default App;
