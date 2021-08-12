import {useReducer} from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import {REMOVE_ALERT, SET_ALERT} from "../../types";

const AlertState = props => {
    //region globalState --> holds all the state needed for github applocation has users,user,repos and loading
    const initialState = null; // set the whole thing to null as only one thing is nedded.


    //endregion

    //region setting up reducer.
    const [state, dispatch] = useReducer(AlertReducer, initialState)
    // state will hold all the property for GithubReducer which will hold users,user,reps and loading
    // dispatch --> is the function which includes the arugment to what action to take when the program will load.

    //endregion

    //region  setAlert() --> sets alert value
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg, type}
        })
        setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000)
    };
//endregion
    return <AlertContext.Provider value={
        // this will make the whole app have acess to value items.
        //
        {
            alert: state,
            setAlert


        }}>
        {props.children}
    </AlertContext.Provider>
}
export default AlertState