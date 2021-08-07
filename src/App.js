import './App.css';
import {Component} from "react";


import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/search";


class App extends Component {
    state = {
        users: [],
        loading: false
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

    componentDidMount() {


        // get is axios so this avoids. then easily.
        this.setState({users: [], loading: false})


    }


    render() {

        const {users, loading} = this.state;

        return (
            <div>
                <Navbar/>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0}/>
                <div className="container">

                    <Users loading={loading} users={users}/>
                </div>
            </div>
        );
    }
}


export default App;
