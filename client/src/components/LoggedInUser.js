import React, {Component} from 'react';

class LoggedInUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            tweet:[{title: ""}],
        };
    }

    componentDidMount() {
        this.renderTweet();
    }

    renderTweet=()=>{
        // e.preventDefault();
        fetch('/users/mytweets',{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.props.username,
            }),
        })
            .then(data=>data.json())
            .then(response=>
            {
                console.log(response);
                this.setState({tweet:response.tweet});
            })
    };


    render() {
        return (
            <div>
                <p>
                    <img src={this.props.image} alt="profile" width='80px' height='100%'/>
                </p>
                <p>
                    <img src={this.props.background_image} alt="background" width='80px' height='100%'/>
                </p>
                <hr/>
                <h1>{this.props.username}</h1>
                {/*<p>{this.props.tweet.title}</p>*/}
                {this.state.tweet[0].title}
            </div>
        );
    }
}

export default LoggedInUser;