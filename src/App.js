import './App.css';
import {Component} from "react";


import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";


class App extends Component {
    state = {
        users: [],
        loading: false
    }


    async componentDidMount() {
        //region setting the states
        this.setState({loading: true})

        //endregion

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        this.setState({users: res.data, loading: false})


    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">

                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </div>
        );
    }
}


export default App;
