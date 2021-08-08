import React, {Component} from 'react';
import PropTypes from "prop-types";

class Search extends Component {

    //region state --> text
    state = {
        text: ''
    }
    //endregion

    //region methods onChange(),onSubmit()
    //region onChange --> onChange Event will set the text based on the property.
    onChange = (e) => {
        //e is theve event object
        this.setState({[e.target.name]: e.target.value})
        //  {[e.target.name] note that this means computed property.


        // e.target.value is equal to e.target.value. will get the text value from the keyboard.
        // works as a computed property/

    }
//endregion

    //region  onSubmit --> this submits the form
    onSubmit = (e) => {
        e.preventDefault();

        const {searchUsers, setAlert} = this.props; //geething methods.
        if (this.state.text === '') {
            setAlert("please enter something", "light")
            //region  this.props.setAlert("please enter something", "light") code explanation
                 /*
                 upon the search button if the users does not type anything error state is created and its gets passed to Alert componenet to show show error.
                  */
            //endregion
        } else {
            searchUsers(this.state.text); // search users is the function
            //region this.props.searchUsers(this.state.text); code explanation
                /*
                const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
                this.props.searchUsers(this.state.text); gets user array based text of the property here.  and fetch data of users.
                 */

            //endregion
            this.setState({text: ''}) // after submission set the text to empty
        }


    }
//endregion

    //endregion
    render() {
        const {clearUsers, showClear} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text"
                           placeholder="Search users..."
                           className="text"
                           name='text'
                           onChange={this.onChange} // resposnible for setting the value of the state
                           value={this.state.text}  // value is based on text property what ever is recvied
                    />

                    <input type="submit" className="btn btn-dark btn-block"/>
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
                {/*this shows the users based on  users if it shows an item was more than one clear message will be shown */}
            </div>
        );
    }

    // this makes the props required.
    static propTypes = {
        searchUsers: PropTypes.func.isRequired, // means thesse are mandtory and must be added
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }
}

export default Search;