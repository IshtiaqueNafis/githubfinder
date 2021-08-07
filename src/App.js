import './App.css';
import {Component} from "react";
import axios from "axios";


import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/search";
import Alert from "./components/layout/alert";


class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null
    }
    searchUsers = async (text) => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        this.setState({users: res.data.items, loading: false}) // its items cause of the search it will cause pagination

    }

    clearUsers = async () => {

        this.setState({users: [], loading: false})
    }

    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})
        setTimeout(() => this.setState({alert: null}),5000)
    }

    componentDidMount() {


        // get is axios so this avoids. then easily.
        this.setState({users: [], loading: false})


    }


    render() {

        const {users, loading, alert} = this.state;


        return (
            <div className="App">
                <Navbar/>
                <div className="container">
                    <Alert alert={alert}/>
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0}
                            setAlert={this.setAlert}/>

                    <Users loading={loading} users={users}/>
                </div>
            </div>
        );
    }
}


export default App;
