import React, {Component} from 'react';

class Search extends Component {
    state = {
        text: ''
    }
    onChange = (e) => {
        //e is theve event object
        this.setState({[e.target.name]: e.target.value})
        // e.target.value is equal to e.target.value. will get the text value from the keyboard.
        // works as a computed property/
    }
    onSubmit = (e)=>{
        e.preventDefault();
    }
        render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text"
                           placeholder="Search users..."
                           className="text"
                           value={this.state.text}
                           onChange={this.onChange}/>

                    <input type="submit" className="btn btn-dark btn-block"/>
                </form>
            </div>
        );
    }
}

export default Search;