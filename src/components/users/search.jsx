import React, {Component} from 'react';
import PropTypes from "prop-types";

class Search extends Component {

    //region state text
    state = {
        text: ''
    }
    //endregion

    //region methods onChange(),onSubmit()
    //region onChange --> onChange Event will set the text based on the property.
    onChange = (e) => {
        //e is theve event object
        this.setState({[e.target.name]: e.target.value})


        // e.target.value is equal to e.target.value. will get the text value from the keyboard.
        // works as a computed property/

    }
//endregion

    //region  onSubmit --> this submits the form
    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.text === '') {
            this.props.setAlert("please enter something", "light")
        } else {
            this.props.searchUsers(this.state.text); // search users is the function
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
                           value={this.state.text}
                           onChange={this.onChange}/>

                    <input type="submit" className="btn btn-dark btn-block"/>
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
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