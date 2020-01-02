import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if(this.props.id) {

            // this check is so that networK call doesnt go in infinite loop 
            // and only be made called when there is a new id from props
            if( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios
                    .get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
            
        }
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        // this is required because ajax call is async and due to which
        // immediately after the setState in axios.then component is rendered
        // before getting the this.props.id
        // so to make it wait till the id is fetched we make it wait like this.
        if(this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }

        if(this.state.loadedPost) { // can this also be used? => (this.props.id && this.state.loadedPost) instead of that if check?
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;