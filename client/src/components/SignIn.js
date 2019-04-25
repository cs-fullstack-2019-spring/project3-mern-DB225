import React, {Component} from 'react';
import PublicTweets from "./PublicTweets";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn:false,
        };
    }

    submitSignIn = (e) => {
        e.preventDefault();
        fetch('/users',
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),

            })
            .then(data=> data.json())
            .then(response=>{
                console.log(response);
                if(response){
                this.props.userLoggedIn(response.username,response.image, response.background_image,true);
            }
            else
                return this.props.userLoggedIn(undefined,undefined, undefined,false)});
    };

    render(){
        // If the user is not logged in, render the return below
        if(!this.state.isLoggedIn) {
            return(
                <div>
                    <h1>Welcome to Twitter</h1>
                    <form onSubmit={this.submitSignIn}>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                            <input id={"username"} type="text" name='username' placeholder="Pseudo" autoFocus/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                            <input id={"password"} type="password" name='password' placeholder="Password"/>
                        </p>
                        <button>Sign In</button>
                    </form>
                    <PublicTweets />
                </div>
            );
        }
    }
}

export default SignIn;