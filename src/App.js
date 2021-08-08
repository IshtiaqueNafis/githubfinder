import './App.css';
import {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import User from "./components/users/user";


class App extends Component {

    //region state -->
    state = {
        users: [], // will contain all the users object
        repos: [],
        user: {},
        loading: false, // this will decide loading screen
        alert: null, // sets to null by default in the begining.
    }
    //endregion

    //region  methods  searchUsers (), clearUsers,setAlert,componentDidMount() ,getUserRepos();

    //region     searchUsers = async (text) --> finds users based text and set the state for the users object.
    searchUsers = async (text) => {
        this.setState({loading: true}); // loading has been done
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
        this.setState({users: res.data.items, loading: false})
        //region code explanation
        //this.setState({users: res.data.items, loading: false})
        /*
        if it was multiple user without search parameter it would hae been res.data
        since its single datas are saved on res.data.itens
         */

        //endregion
    }
//endregion

    //region  clearUsers() --> clear searches resets state to 0
    clearUsers = async () => this.setState({users: [], loading: false})
    //endregion

    //region   setAlert() --> setalert state if a useres typed an error message.
    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})
        setTimeout(() => this.setState({alert: null}), 5000)
    }

    //endregion

    //region    getUser = async (username)  -->get a single github user
    getUser = async (username) => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        this.setState({user: res.data, loading: false}) // this gives it single item
    }
    //endregion

    //region getUsersRepos() --> get repo of the users
    getUserRepos = async username => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //region await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //{username}/repos?per_page=5&sort=created:as -->repos this gets the repo item.
        //per_page=5 --> get 5 pages from the item
        // sort=created:as sort is created based om ascedinmg order.
        //endregion
        this.setState({repos: res.data, loading: false})
    }

    //endregion

    //region componentDidMount() --> set the state for users to empty null and sets loading to false.
    componentDidMount() {
        // get is axios so this avoids. then easily.
        this.setState({users: [], loading: false})
    }

    //endregion


//endregion

    render() {

        const {users, user, loading, alert,repos} = this.state;


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
                                            searchUsers={this.searchUsers}  // the function that returns an array of users based on search
                                            clearUsers={this.clearUsers} //function resets everything thing
                                            showClear={users.length > 0}
                                            setAlert={this.setAlert}/>

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
                                              getUser={this.getUser} // this gets the user
                                              getUserRepos={this.getUserRepos} // this repos from the users.
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
    }
}


export default App;
