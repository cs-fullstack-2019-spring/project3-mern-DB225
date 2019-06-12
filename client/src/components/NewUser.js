import React, {Component} from 'react';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    // Submission event handler
    submitAddUserForm = (e) => {
        e.preventDefault();
        fetch('/users/newuser', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                image:e.target.image.value,
                background_image:e.target.background_image.value,
            }),
        })
            .then(data => data.json())
            .then(response => this.setState({message:response}))
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.submitAddUserForm}>
                    <p>
                        <label htmlFor={"username"}>Username:</label>
                        <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    </p>
                    <p>
                        <label htmlFor={"password"}>Password:</label>
                        <input id={"password"} type="password" name='password' placeholder="Enter password"/>
                    </p>
                    <p>
                        <label htmlFor={"image"}>Profile Pic:</label>
                        <input type="text"  id={'image'} placeholder="Your Pic"/>
                    </p>
                    <p>
                        <label htmlFor={"background_image"}>Background:</label>
                        <input type="text" id={'background_image'} name="background_image" placeholder="Your Background"/>
                    </p>
                    <button>Create</button>
                </form>
                {this.state.message}
            </div>
        );
    }
}


export default NewUser;