import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING,} from "../../types";

const GithubReducer = (state, action) => {
    // state will be for updating the state.
    // actgion will hold the actions GithubRedurcer will do.
    switch (action.type) {
        // action.type is the arugment being passed
        case SEARCH_USERS:
            return {
                ...state, // state will be recomiled
                users: action.payload, // gets all the users from the github api
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case  SET_LOADING:
            return {
                ...state, // return already on the state. make copy of it add it ant chagne to it.
                loading: true // set the loading to true.
            }
        default:
            return state // default return state.
    }
}

export default GithubReducer