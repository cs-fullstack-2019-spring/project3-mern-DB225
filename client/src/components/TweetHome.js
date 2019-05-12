import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import SignIn from "./SignIn";
import NewUser from "./NewUser";
import MyTweets from "./MyTweets";
import LoggedInUser from "./LoggedInUser";


class TweetHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            image:'',
            background_image:'',
            isLoggedIn:false,
        };
    }

    // // This method runs when the user is going to log in
    userLoggedIn=(userName,img,bck,logged)=>{
      this.setState({
          username: userName,
          image:img,
          background_image:bck,
          isLoggedIn: logged,
      })
    };

    //When the user logs out, we're telling the server to clear the cookies
    userLogOut=()=>{
        this.setState({
            username:'',
            image:'',
            background_image:'',
            isLoggedIn:false,
        });
        fetch('/')
            .then(data=>data.text())
    };

    render() {
        if(!this.state.isLoggedIn) {
            return (
                <Router>
                    <div className={"nav"}>
                    <Link to={'/'} className={'space'}>
                    HOME
                    </Link>
                    <Link to={'/newuser'} className={'space'}>
                    NEW USER
                    </Link>
                    </div>
                <Route exact path={'/'} component={()=><SignIn isLoggedIn={this.state.isLoggedIn} username={this.state.username} userLoggedIn={this.userLoggedIn}/>} />
                <Route path={'/newuser'} component={()=><NewUser />} />
        </Router>

            );
        }
        else{
            return (
                <Router>
                    <div className={"nav"}>
                    <Link to={'/'} className={'space'}>
                        HOME
                    </Link>
                    <Link to={'/mytweets'} className={'space'}>
                        MY ENTRIES
                    </Link>
                    <Link to={'/'} className={'space'} onClick={this.userLogOut}>
                        SIGN OUT
                    </Link>
                    </div>
                    <Route exact path={'/'} component={()=><LoggedInUser username={this.state.username} image={this.state.image} background_image={this.state.background_image} userLoggedIn={this.userLoggedIn}/>} />
                    <Route path={'/mytweets'} component={()=><MyTweets username={this.state.username} userLoggedIn={this.userLoggedIn}/>} />
                </Router>
            );
        }
    }
}

export default TweetHome;