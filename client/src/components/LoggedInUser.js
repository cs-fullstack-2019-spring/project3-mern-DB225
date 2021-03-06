import React, {Component} from 'react';
import PublicTweets from "./PublicTweets";

class LoggedInUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            notice:'',
            tweet:[],
            date: new Date().toLocaleTimeString(),
            isChecked:true,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick=()=>{
      this.setState(rep=>({
          isChecked: !rep.isChecked
      }))
    };

    TweetSubmit=(e)=>{
        e.preventDefault();

        fetch('/users/addTweet', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: this.props.username,
                tweet: {
                    inputText: e.target.inputText.value,
                    image:e.target.image.value,
                }
            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({notice:response}))
    };



    render() {
        return (
            <div>
                <p>
                    <img src={this.props.image} alt="profile" className='profile'/>
                    <img src={this.props.background_image} alt="background" className='profile2'/>
                </p>
                <h2>{this.props.username}</h2>
               <p>Logged at {this.state.date}</p>

                <div>
                    <h1>What's Up?</h1>
                    <form onSubmit={this.TweetSubmit}>
                        <p>
                            <label htmlFor={"inputText"}>Text:</label>
                            <input type="text" id={"inputText"} name={"inputText"}/>
                        </p>
                        <p>
                            <label htmlFor={"image"}>Image:</label>
                            <input type="text" id={"image"} name={"image"}/>
                        </p>
                        <p>
                            <label htmlFor={"checkbox"}>Private?</label>
                            <input type="checkbox" id={"checkbox"} name={"checkbox"} onClick={this.handleClick}/>
                            {this.state.isChecked?"no":"yes"}
                        </p>
                        <button>Publish</button>
                    </form>
                    {this.state.notice}
                </div>

                <div>
                    <PublicTweets/>
                </div>
            </div>
        );
    }
}

export default LoggedInUser;