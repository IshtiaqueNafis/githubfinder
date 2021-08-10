import {useReducer} from "react";
import  axios from "axios"
import githubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT,
} from "../types";

const GitHubState = props => {
    const initialState ={
     users:[],
     user :{},
     repos :[],
     loading:false
    }
    const [state,dispatch] = useReducer(GithubReducer,initialState)


    //search users



    //get user



    // clear user



    // set loading


  return <githubContext.Provider value={
      {
         users:state.users,
         user:state.user,
         repos:state.repos,
         loading:state.loading

      }



  }>{props.children}</githubContext.Provider>
}
export default GitHubState