import React, {useContext, useState} from 'react';
import GithubContext from "../../context/githubContext";
import AlertContext from "../../context/alert/AlertContext";

const Search = () => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    //region function state [text, setText]
    const [text, setText] = useState('')
    //endregion

    //region Methods onChange,onSubmit

    //region onChange --> set the value for text.
    const onChange = (e) => setText(e.target.value)
    //endregion

//region onSubmit ? shows text results if suecessful : shows error message.
    const onSubmit = (e) => {
        e.preventDefault();


        if (text === '') {
            alertContext.setAlert("please enter something", "light")

        } else {
            githubContext.searchUsers(text); // search users is the function
            setText('');
        }
//endregion

    }
//endregion

    //endregion

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text"
                       placeholder="Search users..."
                       className="text"
                       name='text'
                       onChange={onChange} // resposnible for setting the value of the state
                       value={text}  // value is based on text property what ever is recvied
                />

                <input type="submit" className="btn btn-dark btn-block"/>
            </form>
            {githubContext.users.length > 0 &&
            <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
            {/*this shows the users based on  users if it shows an item was more than one clear message will be shown */}
        </div>
    );


}


export default Search;