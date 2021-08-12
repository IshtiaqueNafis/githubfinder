import {useReducer} from "react";
import axios from "axios"
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {CLEAR_USERS, GET_USER, SEARCH_USERS, SET_LOADING} from "../types";

const GitHubState = props => {
    //region globalState --> holds all the state needed for github applocation has users,user,repos and loading
    const initialState = {

        users: [],
        user: {},
        repos: [],
        loading: false
    }
//endregion
    //region setting up reducer.
    const [state, dispatch] = useReducer(GithubReducer, initialState)
    // state will hold all the property for GithubReducer which will hold users,user,reps and loading
    // dispatch --> is the function which includes the arugment to what action to take when the program will load.

    //endregion

    //region  search users and fetches data

    const searchUsers = async text => {
        setLoading();
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
        dispatch({
            type: SEARCH_USERS, // type means it will search through tiems
            payload: res.data.items // what will it search through.
        })


    }
    //endregion

    //get user
    //region    getUser = async (username)  -->get a single github user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        dispatch({
                type: GET_USER,
                payload: res.data
            }
        )
    }
    //endregion

    // clear user
    //region  clearUsers() --> clear searches resets state to 0

    //endregion

    // set loading --> set loading to true or false.
    const setLoading = () => dispatch({type: SET_LOADING}) // will be passed on gitHubreducer to set loading to true or false.
    const clearUsers = () => dispatch({type: CLEAR_USERS}) // will be passed on gitHubreducer to set loading to true or false.
    // type is the object for the user.

    return <GithubContext.Provider value={
        // this will make the whole app have acess to value items.
        //
        {
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser

        }}>
        {props.children}
    </GithubContext.Provider>
}
export default GitHubState