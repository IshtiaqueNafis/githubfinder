import {useReducer} from "react";
import axios from "axios"
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from "../../types";


const GitHubState = props => {
    //region state --> Users[],user{}.repos:[],loading:bool
    const initialState = {
        users: [], // --> this will get the users array from the server
        user: {}, // --> this will show the user object based on details.
        repos: [], //--> this will show all the reps from the user.
        loading: false // --> set for loading screen.
    }
    //endregion

    //region setting up reducer.
    const [state, dispatch] = useReducer(GithubReducer, initialState)
    //GithubReducer --> this will handle all the requenest
    // initialState --> initalState is the state being passed here to get the properties for the state

    //endregion

    //region methods searchUsers(), getUser (),setLoading(),clearUsers(),getUserRepos()
    //region  searchUsers(text) ==> get array based on what userTypes.

    const searchUsers = async text => {
        setLoading();  //--> set loading to true to show the loading page.
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
            // will create two object with the following properties.
            type: SEARCH_USERS, // This is a constant value which will be used to apply for the users.
            payload: res.data.items // what will it search through items for the user.
        })


    }
    //endregion


    //region    getUser = async (username)  -->get a single github user
    const getUser = async (username) => {
        setLoading(); //--> set loading to true to show the loading page.
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // get is axios so this avoids. then easily.
        dispatch({
            // will create two object with the following properties.
                type: GET_USER,
                payload: res.data
            }
        )
    }
    //endregion

    // clear user
    //region  clearUsers() --> clear searches resets state to 0

    //endregion

   //region set loading --> set loading to true to show the login items.
    const setLoading = () => dispatch({type: SET_LOADING}) // will be passed on gitHubreducer to set loading to true or false.
    //endregion

    //region clearUsers --> clears the search result
    const clearUsers = () => dispatch({type: CLEAR_USERS}) // will be passed on gitHubreducer to set loading to true or false.
    //endregion

    //region getUsersRepos() --> get repo of the users
    const getUserRepos = async username => {
        setLoading(); // set to true.
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //region await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //{username}/repos?per_page=5&sort=created:as -->repos this gets the repo item.
        //per_page=5 --> get 5 pages from the item
        // sort=created:as sort is created based om ascedinmg order.
        //endregion
       dispatch({
           type: GET_REPOS,
           payload:res.data // get the single user data.
       })
    }

    //endregion
//endregion

    return <GithubContext.Provider value={
       // value is used to pass the context to the user.
       // create obhects here and pass them here.
        {
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos

        }}>
        {props.children}
    </GithubContext.Provider>
}
export default GitHubState