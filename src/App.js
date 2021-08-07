import './App.css';
import {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";
import Users from "./components/users/Users";
import About from "./components/pages/About";


class App extends Component {

    //region state --> users,loading,null
    state = {
        users: [], // will contain all the users object
        loading: false, // this will decide loading screen
        alert: null // sets to null by default in the begining.
    }
    //endregion

    //region  methods  searchUsers (), clearUsers,setAlert,componentDidMount()

    //region     searchUsers = async (text) --> finds users based text and set the state for the users object.
    searchUsers = async (text) => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        this.setState({users: res.data.items, loading: false}) // its items cause of the search it will cause pagination

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

    //region componentDidMount() --> set the state for users to empty null and sets loading to false.
    componentDidMount() {
        // get is axios so this avoids. then easily.
        this.setState({users: [], loading: false})
    }

    //endregion

//endregion

    render() {

        const {users, loading, alert} = this.state;


        return (
            <Router>


                <div className="App">
                    <Navbar/>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route
                                exact // this means exact page has to be the same with a slash.
                                path='/' // this is the homepage
                                render={props => ( // render means this fragment will be rendered.
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}  // this function will search users and will return an usersobject
                                            clearUsers={this.clearUsers} //
                                            showClear={users.length > 0}
                                            setAlert={this.setAlert}/>

                                        <Users loading={loading} users={users}/>
                                    </Fragment>
                                )}

                            />
                            <Route exact path='/about' component={About} />
                         </Switch>

                    </div>
                </div>
            </Router>
        );
    }
}


export default App;
