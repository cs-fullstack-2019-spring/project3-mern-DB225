import React, {Component} from 'react';
import PublicTweets from "./PublicTweets";

class LoggedInUser extends Component {
    render() {
        return (
            <div>
                <p>
                    <img src={this.props.image} alt="profile" className='profile'/>
                    <img src={this.props.background_image} alt="background"className='profile2'/>
                </p>
                <h1>{this.props.username}</h1>
                <hr/>
                <PublicTweets />
            </div>
        );
    }
}

export default LoggedInUser;